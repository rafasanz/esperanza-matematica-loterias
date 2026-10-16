import { liveSectionBoundaries, sectionBoundaries } from "../config/lottery.js";
import { parseEuro } from "../utils/format.js";

export async function fetchSource(
  url,
  label,
  { timeoutMs = 20000, fetchImpl = fetch } = {},
) {
  const response = await fetchImpl(url, {
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    throw new Error(`${label}: HTTP ${response.status}`);
  }

  const text = await response.text();
  if (
    !text.trim() ||
    /informacion-geobloqueo-pais|access denied|rate limit exceeded/i.test(text)
  ) {
    throw new Error(`${label}: fuente no disponible`);
  }
  return text;
}

export function normalizeText(text) {
  return text
    .replace(/\r/g, "")
    .replace(/\u00a0|\u202f/g, " ")
    .replace(/\[!\[[^\]]*\][^\)]*\)\s*/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\| --- \|.*$/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

export function parseGame(text, liveEntries, game, now = new Date()) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const startIndex = lines.findIndex(
    (line) => line.startsWith(game.startsWith) && extractDate(line),
  );

  let endIndex = lines.length;

  for (let index = startIndex + 1; index < lines.length; index += 1) {
    if (
      sectionBoundaries.some((boundary) => lines[index].startsWith(boundary))
    ) {
      endIndex = index;
      break;
    }
  }

  const sectionLines =
    startIndex === -1 ? [] : lines.slice(startIndex, endIndex);
  const sectionText = sectionLines.join("\n");
  const liveEntry = findLiveEntry(liveEntries, game, now);
  const resultDate = extractDate(sectionLines[0] || "");
  const resultAdvertisedJackpot = extractMetric(
    sectionText,
    /Bote publicitado:[\s|]*([\d.,]+)\s*€/i,
  );
  const categories = (game.categories || []).map((category) => {
    const line = findCategoryLine(sectionLines, category);
    return {
      ...category,
      line,
      prize: line ? extractPrizeFromLine(line) : null,
      winners: line ? extractWinnersFromLine(line) : null,
    };
  });
  // Never carry a resolved draw's advertised jackpot into a future draw.
  const currentAdvertisedJackpot = liveEntry?.advertisedJackpot ?? null;
  const betsReceived = extractMetric(
    sectionText,
    /Apuestas recibidas:[\s|]*([\d.,]+)/i,
  );
  const resultAge = resultDate
    ? (dateNumber(todayInMadrid(now)) - dateNumber(resultDate)) / 86400000
    : Infinity;
  let modelNote = null;
  if (!liveEntry)
    modelNote =
      "No se ha verificado el sorteo en juego; no se reutiliza una fecha pasada.";
  else if (!game.fixedRows && (resultAge < 0 || resultAge > 14))
    modelNote =
      "Falta un resultado reciente para estimar las categorías variables.";
  if (["lototurf", "quintuple-plus"].includes(game.id)) {
    modelNote =
      "Sin ranking: las probabilidades hípicas dependen de los participantes y de cada carrera. Las cuotas del desglose son solo orientativas.";
  }

  return {
    id: game.id,
    name: game.name,
    drawDate: liveEntry?.drawDate || null,
    resultDate,
    betPrice: game.betPrice,
    minimumTicketPrice: game.minimumTicketPrice,
    advertisedJackpot: currentAdvertisedJackpot,
    advertisedJackpotSource: currentAdvertisedJackpot ? "bote-vigente" : null,
    liveAdvertisedJackpot: liveEntry?.advertisedJackpot ?? null,
    resultAdvertisedJackpot,
    betsReceived,
    modelNote,
    fixedRows: game.fixedRows || [],
    categories,
    extraPrizes: (game.extraPrizes || []).map((extraPrize) => ({
      label: extraPrize.label,
      odds: extraPrize.oddsFromBets ? betsReceived : extraPrize.odds,
      prize: extraPrize.prize,
    })),
    jackpotCategory: game.jackpotCategory || null,
    liveSubtitle: liveEntry?.subtitle || null,
  };
}

export function parseLiveEntries(text) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const entries = [];

  for (let index = 0; index < lines.length; index += 1) {
    if (!liveSectionBoundaries.includes(lines[index])) {
      continue;
    }

    let endIndex = lines.length;

    for (let nextIndex = index + 1; nextIndex < lines.length; nextIndex += 1) {
      if (liveSectionBoundaries.includes(lines[nextIndex])) {
        endIndex = nextIndex;
        break;
      }
    }

    entries.push(buildLiveEntry(lines.slice(index, endIndex)));
    index = endIndex - 1;
  }

  return entries;
}

function buildLiveEntry(lines) {
  const name = lines[0];
  const body = lines.slice(1);
  const dateIndex = body.findIndex(isLiveDateLine);
  const beforeDate = dateIndex === -1 ? body : body.slice(0, dateIndex);
  const afterDate = dateIndex === -1 ? [] : body.slice(dateIndex + 1);
  const subtitle =
    afterDate.find(
      (line) =>
        !isCountdownLine(line) && line !== "Jugar" && !line.startsWith("*"),
    ) || null;
  const dateLine = dateIndex === -1 ? null : body[dateIndex];

  return {
    name,
    drawDate: dateLine ? formatSpanishDate(dateLine) : null,
    weekday: dateLine ? extractSpanishWeekday(dateLine) : null,
    closeMinutes: dateLine ? extractCloseMinutes(dateLine) : null,
    subtitle,
    advertisedJackpot: extractLivePrize(
      name.toLowerCase() === "eurodreams" ? body : beforeDate,
      name.toLowerCase() === "eurodreams",
    ),
  };
}

function findLiveEntry(entries, game, now) {
  const madridParts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Madrid",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map(({ type, value }) => [type, value]),
  );
  const minutesNow = Number(madridParts.hour) * 60 + Number(madridParts.minute);
  const matchingEntries = entries
    .filter(
      (entry) =>
        entry.name.toLocaleLowerCase("es") ===
          game.liveName.toLocaleLowerCase("es") &&
        entry.drawDate &&
        (dateNumber(entry.drawDate) > dateNumber(todayInMadrid(now)) ||
          (dateNumber(entry.drawDate) === dateNumber(todayInMadrid(now)) &&
            (entry.closeMinutes == null || entry.closeMinutes > minutesNow))),
    )
    .sort((a, b) => dateNumber(a.drawDate) - dateNumber(b.drawDate));

  if (!matchingEntries.length) {
    return null;
  }

  if (typeof game.liveEntryMatcher === "function") {
    return (
      matchingEntries.find((entry) => game.liveEntryMatcher(entry)) || null
    );
  }

  return matchingEntries[0];
}

function findCategoryLine(lines, category) {
  // Only search the first category table: Primitiva also includes a Joker table.
  const jokerIndex = lines.findIndex((line) => /Categorías Joker/i.test(line));
  const tableLines = (
    jokerIndex < 0 ? lines : lines.slice(0, jokerIndex)
  ).filter((line) => line.startsWith("|"));
  if (category.exactLineStart) {
    return (
      tableLines.find((line) => line.startsWith(category.exactLineStart)) ||
      null
    );
  }

  return (
    tableLines.find((line) =>
      category.aliases.some((alias) => line.includes(alias)),
    ) || null
  );
}

function extractDate(line) {
  const match = line.match(/(\d{2}\/\d{2}\/\d{4})/);
  return match && Number.isFinite(dateNumber(match[1])) ? match[1] : null;
}

function extractMetric(text, regex) {
  const match = text.match(regex);
  return match ? parseEuro(match[1]) : null;
}

function extractWinnersFromLine(line) {
  const match = line.match(/^\|[^|]+\|\s*([\d\.]+)\s*\|/);
  return match ? Number.parseInt(match[1].replace(/\./g, ""), 10) : null;
}

function extractPrizeFromLine(line) {
  const matches = [...line.matchAll(/([\d\.\,]+)\s*€/g)];
  return matches.length ? parseEuro(matches[matches.length - 1][1]) : null;
}

function extractLivePrize(lines, annuity = false) {
  const combined = lines.join(" ");
  if (annuity) {
    const amount = combined.match(/([\d.,]+)\s*€/);
    const duration = combined.match(
      /(?:al\s+mes|\/\s*mes)\s*(?:durante\s*)?(\d+)\s*años/i,
    );
    return amount && duration
      ? parseEuro(amount[1]) * 12 * Number(duration[1])
      : null;
  }
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    const millions = line.match(/^([\d.,]+)\s*millones(?:\s*€)?$/i);
    if (millions) return parseEuro(millions[1]) * 1000000;
    if (/^[\d.,]+\s*€$/.test(line)) return parseEuro(line);
    if (
      index < lines.length - 1 &&
      /^millones$/i.test(lines[index + 1]) &&
      /^[\d.,]+$/.test(line)
    )
      return parseEuro(line) * 1000000;
  }

  return null;
}

function isLiveDateLine(line) {
  return /^(lunes|martes|miércoles|jueves|viernes|sábado|domingo),?\s*\d{1,2}\s+de\s+[a-záéíóú]+\s+de\s+\d{4}(?:\s*[-–]\s*\d{1,2}:\d{2}\s*h)?$/i.test(
    line,
  );
}

function isCountdownLine(line) {
  return (
    /^\d+d(?: \d+h)?$/i.test(line) ||
    /^\d+h(?: \d+min)?$/i.test(line) ||
    /^\d+min$/i.test(line)
  );
}

function extractSpanishWeekday(line) {
  const match = line.match(
    /^(lunes|martes|miércoles|jueves|viernes|sábado|domingo)/i,
  );
  return match ? match[1].toLowerCase() : null;
}

function extractCloseMinutes(line) {
  const match = line.match(/[-–]\s*(\d{1,2}):(\d{2})\s*h?$/i);
  if (!match || Number(match[1]) > 23 || Number(match[2]) > 59) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function formatSpanishDate(line) {
  const match = line.match(/(\d{1,2})\s+de\s+([a-záéíóú]+)\s+de\s+(\d{4})/i);

  if (!match) {
    return null;
  }

  const day = String(Number.parseInt(match[1], 10)).padStart(2, "0");
  const month = getSpanishMonthNumber(match[2]);

  if (!month) {
    return null;
  }

  return `${day}/${month}/${match[3]}`;
}

function getSpanishMonthNumber(monthName) {
  const months = {
    enero: "01",
    febrero: "02",
    marzo: "03",
    abril: "04",
    mayo: "05",
    junio: "06",
    julio: "07",
    agosto: "08",
    septiembre: "09",
    setiembre: "09",
    octubre: "10",
    noviembre: "11",
    diciembre: "12",
  };

  return months[monthName.toLowerCase()] || null;
}

function todayInMadrid(now) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid" }).format(
    now,
  );
}

function dateNumber(value) {
  const [day, month, year] = value.split("/").map(Number);
  const timestamp = Date.UTC(year, month - 1, day);
  const date = new Date(timestamp);
  return date.getUTCDate() === day && date.getUTCMonth() === month - 1
    ? timestamp
    : NaN;
}
