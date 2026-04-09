import { liveSectionBoundaries, sectionBoundaries } from "../config/lottery.js";
import { parseEuro } from "../utils/format.js";

export async function fetchSource(url, label) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${label}: HTTP ${response.status}`);
  }

  return response.text();
}

export function normalizeText(text) {
  return text
    .replace(/\r/g, "")
    .replace(/\[!\[[^\]]*\][^\)]*\)\s*/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\| --- \|.*$/gm, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

export function parseGame(text, liveEntries, game) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const startIndex = lines.findIndex((line) => line.startsWith(game.startsWith));

  if (startIndex === -1) {
    return null;
  }

  let endIndex = lines.length;

  for (let index = startIndex + 1; index < lines.length; index += 1) {
    if (sectionBoundaries.some((boundary) => lines[index].startsWith(boundary))) {
      endIndex = index;
      break;
    }
  }

  const sectionLines = lines.slice(startIndex, endIndex);
  const sectionText = sectionLines.join("\n");
  const liveEntry = findLiveEntry(liveEntries, game);
  const resultDate = extractDate(sectionLines[0]);
  const resultAdvertisedJackpot = extractMetric(sectionText, /Bote publicitado: ?([\d\.\,]+)\s*€/);
  const categories = (game.categories || []).map((category) => {
    const line = findCategoryLine(sectionLines, category);
    return {
      ...category,
      line,
      prize: line ? extractPrizeFromLine(line) : null,
      winners: line ? extractWinnersFromLine(line) : null
    };
  });
  const jackpotCategoryRow = categories.find((category) => category.key === game.jackpotCategory) || null;
  const canReuseResultJackpot = Boolean(resultAdvertisedJackpot) && jackpotCategoryRow && jackpotCategoryRow.winners === 0;
  const currentAdvertisedJackpot = liveEntry?.advertisedJackpot ?? (canReuseResultJackpot ? resultAdvertisedJackpot : null);
  const currentJackpotSource = liveEntry?.advertisedJackpot
    ? "bote-vigente"
    : canReuseResultJackpot
      ? "bote-acumulado"
      : null;

  return {
    id: game.id,
    name: game.name,
    drawDate: liveEntry?.drawDate || resultDate,
    resultDate,
    betPrice: game.betPrice,
    minimumTicketPrice: game.minimumTicketPrice,
    advertisedJackpot: currentAdvertisedJackpot,
    advertisedJackpotSource: currentJackpotSource,
    liveAdvertisedJackpot: liveEntry?.advertisedJackpot ?? null,
    resultAdvertisedJackpot,
    betsReceived: extractMetric(sectionText, /Apuestas recibidas: ?([\d\.\,]+)/),
    fixedRows: game.fixedRows || [],
    categories,
    extraPrizes: (game.extraPrizes || []).map((extraPrize) => ({
      label: extraPrize.label,
      odds: extraPrize.oddsFromBets ? extractMetric(sectionText, /Apuestas recibidas: ?([\d\.\,]+)/) : extraPrize.odds,
      prize: extraPrize.prize
    })),
    jackpotCategory: game.jackpotCategory || null,
    liveSubtitle: liveEntry?.subtitle || null
  };
}

export function parseLiveEntries(text) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
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
  const subtitle = afterDate.find((line) => !isCountdownLine(line) && line !== "Jugar" && !line.startsWith("*")) || null;
  const dateLine = dateIndex === -1 ? null : body[dateIndex];

  return {
    name,
    drawDate: dateLine ? formatSpanishDate(dateLine) : null,
    weekday: dateLine ? extractSpanishWeekday(dateLine) : null,
    subtitle,
    advertisedJackpot: extractLivePrize(beforeDate)
  };
}

function findLiveEntry(entries, game) {
  const matchingEntries = entries.filter((entry) => entry.name === game.liveName);

  if (!matchingEntries.length) {
    return null;
  }

  if (typeof game.liveEntryMatcher === "function") {
    return matchingEntries.find((entry) => game.liveEntryMatcher(entry)) || null;
  }

  return matchingEntries[0];
}

function findCategoryLine(lines, category) {
  if (category.exactLineStart) {
    return lines.find((line) => line.startsWith(category.exactLineStart)) || null;
  }

  return lines.find((line) => category.aliases.some((alias) => line.includes(alias))) || null;
}

function extractDate(line) {
  const match = line.match(/(\d{2}\/\d{2}\/\d{4})/);
  return match ? match[1] : null;
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

function extractLivePrize(lines) {
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (/€/.test(line)) {
      return parseEuro(line);
    }

    if (index < lines.length - 1 && /^millones$/i.test(lines[index + 1])) {
      return parseEuro(line) * 1000000;
    }
  }

  return null;
}

function isLiveDateLine(line) {
  return /^(lunes|martes|miércoles|jueves|viernes|sábado|domingo),\s*\d{1,2}\s+de\s+[a-záéíóú]+\s+de\s+\d{4}-\d{1,2}:\d{2}h$/i.test(line);
}

function isCountdownLine(line) {
  return /^\d+d(?: \d+h)?$/i.test(line) || /^\d+h(?: \d+min)?$/i.test(line) || /^\d+min$/i.test(line);
}

function extractSpanishWeekday(line) {
  const match = line.match(/^(lunes|martes|miércoles|jueves|viernes|sábado|domingo)/i);
  return match ? match[1].toLowerCase() : null;
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
    diciembre: "12"
  };

  return months[monthName.toLowerCase()] || null;
}
