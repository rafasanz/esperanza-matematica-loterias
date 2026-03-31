import type { ICategory, IGame } from '~models/game';
import type { IGameRanking } from '~models/gameRanking';
import type { ILiveEntry } from '~models/liveEntry';
import type { IParsedGame } from '~models/parsedGame';
import { liveSectionBoundaries, SECTION_BOUNDARIES } from '~utils/constants';
import { extractSpanishWeekday, formatSpanishDate } from '~utils/i18n';

/**
 * Limpia el markdown devuelto por el proxy para dejar un texto plano más fácil de parsear.
 */
export function normalizeText(text: string) {
  return text
    .replace(/\r/g, '')
    .replace(/\[!\[[^\]]*\][^)]*\)\s*/g, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\| --- \|.*$/gm, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s+/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

/**
 * Parte la página de "Ahora en juego" en bloques independientes, uno por sorteo.
 */
export function parseLiveEntries(text: string): ILiveEntry[] {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const entries = [];

  for (let index = 0; index < lines.length; index++) {
    if (!liveSectionBoundaries.includes(lines[index])) {
      continue;
    }

    let endIndex = lines.length;

    for (let nextIndex = index + 1; nextIndex < lines.length; nextIndex++) {
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

/**
 * Convierte un bloque de "Ahora en juego" en una entrada con fecha, subtítulo y premio anunciado.
 */
export function buildLiveEntry(lines: string[]) {
  const name = lines[0];
  const body = lines.slice(1);
  const dateIndex = body.findIndex(isLiveDateLine);
  const beforeDate = dateIndex === -1 ? body : body.slice(0, dateIndex);
  const afterDate = dateIndex === -1 ? [] : body.slice(dateIndex + 1);
  const subtitle =
    afterDate.find(
      (line) =>
        !isCountdownLine(line) && line !== 'Jugar' && !line.startsWith('*'),
    ) || null;
  const dateLine = dateIndex === -1 ? null : body[dateIndex];

  return {
    name,
    drawDate: dateLine ? formatSpanishDate(dateLine) : null,
    weekday: dateLine ? extractSpanishWeekday(dateLine) : null,
    subtitle,
    advertisedJackpot: extractLivePrize(beforeDate),
  };
}

/**
 * Identifica las líneas de cuenta atrás para no confundirlas con metadatos útiles.
 */
function isCountdownLine(line: string) {
  return (
    /^\d+d(?: \d+h)?$/i.test(line) ||
    /^\d+h(?: \d+min)?$/i.test(line) ||
    /^\d+min$/i.test(line)
  );
}

/**
 * Lee el premio anunciado en la página de "Ahora en juego", ya sea en euros o en millones.
 */
function extractLivePrize(lines: string[]) {
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

/**
 * Convierte importes con formato español a número decimal de JavaScript.
 */
function parseEuro(value: unknown) {
  return Number.parseFloat(
    String(value).replace(/[€\s]/g, '').replace(/\./g, '').replace(',', '.'),
  );
}

/**
 * Detecta si una línea corresponde a la fecha/hora de un sorteo en la página de juegos en curso.
 */
function isLiveDateLine(line: string) {
  return /^(lunes|martes|miércoles|jueves|viernes|sábado|domingo),\s*\d{1,2}\s+de\s+[a-záéíóú]+\s+de\s+\d{4}-\d{1,2}:\d{2}h$/i.test(
    line,
  );
}

/**
 * Extrae de la página de resultados toda la información relevante de un juego concreto.
 */
export function parseGame(
  game: IGame,
  results: string,
  liveEntries: ILiveEntry[],
): IParsedGame | null {
  const lines = results
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const startIndex = lines.findIndex((line) =>
    line.startsWith(game.startsWith),
  );

  if (startIndex < 0) {
    return null;
  }

  let endIndex = lines.length;

  for (let index = startIndex + 1; index < lines.length; index++) {
    if (
      SECTION_BOUNDARIES.some((boundary) => lines[index].startsWith(boundary))
    ) {
      endIndex = index;
      break;
    }
  }

  const sectionLines = lines.slice(startIndex, endIndex);
  const sectionText = sectionLines.join('\n');
  const liveEntry = findLiveEntry(liveEntries, game);
  const resultDate = extractDate(sectionLines[0]);
  const resultAdvertisedJackpot = extractMetric(
    sectionText,
    /Bote publicitado: ?([\d.,]+)\s*€/,
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
  const jackpotCategoryRow =
    categories.find((category) => category.key === game.jackpotCategory) ||
    null;
  const canReuseResultJackpot =
    Boolean(resultAdvertisedJackpot) &&
    jackpotCategoryRow &&
    jackpotCategoryRow.winners === 0;
  const currentAdvertisedJackpot =
    liveEntry?.advertisedJackpot ??
    (canReuseResultJackpot ? resultAdvertisedJackpot : null);
  const currentJackpotSource = liveEntry?.advertisedJackpot
    ? 'bote-vigente'
    : canReuseResultJackpot
      ? 'bote-acumulado'
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
    betsReceived: extractMetric(sectionText, /Apuestas recibidas: ?([\d.,]+)/),
    fixedRows: game.fixedRows || [],
    categories,
    extraPrizes: (game.extraPrizes || []).map((extraPrize) => ({
      label: extraPrize.label,
      odds: extraPrize.oddsFromBets
        ? extractMetric(sectionText, /Apuestas recibidas: ?([\d.,]+)/)
        : extraPrize.oddsFromBets,
      prize: extraPrize.prize,
    })),
    jackpotCategory: game.jackpotCategory,
    liveSubtitle: liveEntry?.subtitle || null,
  };
}

/**
 * Busca la entrada en vivo que corresponde al juego actual, aplicando filtros cuando hace falta.
 */
function findLiveEntry(entries: ILiveEntry[], game: IGame) {
  const matchingEntries = entries.filter(
    (entry: ILiveEntry) => entry.name === game.liveName,
  );

  if (!matchingEntries.length) {
    return null;
  }

  if (typeof game.liveEntryMatcher === 'function') {
    return (
      matchingEntries.find((entry: ILiveEntry) =>
        game.liveEntryMatcher?.(entry),
      ) || null
    );
  }

  return matchingEntries[0];
}

/**
 * Extrae una fecha en formato dd/mm/aaaa desde una línea de texto.
 */
function extractDate(line: string) {
  const match = line.match(/(\d{2}\/\d{2}\/\d{4})/);
  return match ? match[1] : null;
}

/**
 * Aplica una expresión regular a un bloque y convierte el valor monetario o numérico encontrado.
 */
function extractMetric(text: string, regex: RegExp) {
  const match = text.match(regex);
  return match ? parseEuro(match[1]) : null;
}

/**
 * Localiza la línea exacta de una categoría dentro del bloque de resultados del juego.
 */
function findCategoryLine(lines: string[], category: ICategory) {
  if (category.exactLineStart) {
    return (
      lines.find((line) => line.startsWith(category.exactLineStart!)) || null
    );
  }

  return (
    lines.find((line) =>
      category.aliases.some((alias) => line.includes(alias)),
    ) || null
  );
}

/**
 * Devuelve el último importe en euros encontrado en una línea de categoría.
 */
function extractPrizeFromLine(line: string) {
  const matches = [...line.matchAll(/([\d.,]+)\s*€/g)];
  return matches.length ? parseEuro(matches[matches.length - 1][1]) : null;
}

/**
 * Obtiene el número de acertantes de una fila de premios en formato tabla markdown.
 */
function extractWinnersFromLine(line: string) {
  const match = line.match(/^\|[^|]+\|\s*([\d.]+)\s*\|/);
  return match ? Number.parseInt(match[1].replace(/\./g, ''), 10) : null;
}

/**
 * Calcula el retorno esperado y la esperanza neta a partir de premios, probabilidades y apuesta mínima.
 */
export function calculateExpectation(game: IParsedGame): IGameRanking {
  if (game.fixedRows.length > 0) {
    const rows = game.fixedRows.map((row) => ({
      label: row.label,
      prize: row.prize,
      odds: row.odds,
      expected: row.prize / row.odds,
    }));

    const expectedPayout = rows.reduce((total, row) => total + row.expected, 0);

    return {
      ...game,
      rows,
      topPrize: rows.length ? Math.max(...rows.map((row) => row.prize)) : 0,
      expectationStatus: 'exacta',
      expectedPayout,
      expectedNet: expectedPayout - game.minimumTicketPrice,
    };
  }

  const multiplier = game.minimumTicketPrice / game.betPrice;
  const rows = [];
  let missingCurrentTopPrize = false;

  for (const category of game.categories || []) {
    if (!category.odds) {
      continue;
    }

    let effectivePrize: number | undefined | null = category.prize;
    let prizeSource = category.prize ? 'ultimo-resultado' : 'sin-dato';
    const isJackpotCategory = game.jackpotCategory === category.key;

    if (isJackpotCategory) {
      if (game.advertisedJackpot) {
        effectivePrize = game.advertisedJackpot;
        prizeSource = game.advertisedJackpotSource || 'bote-vigente';
      } else {
        effectivePrize = null;
        prizeSource = 'vigente-no-publicado';
        missingCurrentTopPrize = true;
      }
    }

    if ((!effectivePrize || effectivePrize === 0) && category.fixedPrize) {
      effectivePrize = category.fixedPrize;
      prizeSource = 'premio-fijo';
    }

    rows.push({
      label: category.label,
      prize: effectivePrize,
      odds: category.odds,
      expected:
        effectivePrize == null
          ? null
          : (effectivePrize / category.odds) * multiplier,
      source: prizeSource,
    });
  }

  for (const extraPrize of game.extraPrizes || []) {
    if (!extraPrize.odds || !extraPrize.prize) {
      continue;
    }

    rows.push({
      label: extraPrize.label,
      prize: extraPrize.prize,
      odds: extraPrize.odds,
      expected: (extraPrize.prize / extraPrize.odds) * multiplier,
      source: 'premio-fijo',
    });
  }

  const knownExpectedPayout = rows.reduce(
    (total, row) => total + (row.expected || 0),
    0,
  );
  const expectedPayout = missingCurrentTopPrize ? null : knownExpectedPayout;

  return {
    ...game,
    rows,
    topPrize: missingCurrentTopPrize
      ? null
      : rows.length
        ? Math.max(...rows.map((row) => row.prize || 0))
        : null,
    expectationStatus: missingCurrentTopPrize
      ? 'pendiente-premio-maximo'
      : 'exacta',
    knownExpectedPayout,
    expectedPayout,
    expectedNet:
      expectedPayout == null ? null : expectedPayout - game.minimumTicketPrice,
  };
}

/**
 * Ordena los juegos por esperanza neta y deja al final los que no tienen dato completo.
 */
export function compareGamesByExpectation(a: IGameRanking, b: IGameRanking) {
  const aValue = a.expectedNet ?? Number.NEGATIVE_INFINITY;
  const bValue = b.expectedNet ?? Number.NEGATIVE_INFINITY;

  if (aValue === bValue) {
    return a.name.localeCompare(b.name, 'es');
  }

  return bValue - aValue;
}
