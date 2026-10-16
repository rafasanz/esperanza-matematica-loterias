import { FETCH_URL, LIVE_FETCH_URL, games } from "../config/lottery.js";
import {
  fetchSource,
  normalizeText,
  parseLiveEntries,
  parseGame,
} from "./lotteryParser.js";
import { readStored, writeStored } from "../utils/storage.js";

const MAX_CACHE_AGE = 24 * 60 * 60 * 1000;

export async function loadSources({
  fetcher = fetchSource,
  now = Date.now(),
} = {}) {
  const sources = [
    {
      key: "results",
      url: FETCH_URL,
      label: "resultados",
      valid: (text) =>
        games.some((game) =>
          text
            .split("\n")
            .some(
              (line) =>
                line.startsWith(game.startsWith) &&
                /\d{2}\/\d{2}\/\d{4}/.test(line),
            ),
        ),
    },
    {
      key: "live",
      url: LIVE_FETCH_URL,
      label: "sorteos en juego",
      valid: (text) => parseLiveEntries(text).some((entry) => entry.drawDate),
    },
  ];
  const outcomes = await Promise.allSettled(
    sources.map(async (source) => {
      const text = normalizeText(await fetcher(source.url, source.label));
      if (!source.valid(text))
        throw new Error(
          `${source.label}: el formato recibido no contiene sorteos válidos`,
        );
      const snapshot = { text, at: now };
      writeStored(`lottery-v06-${source.key}`, JSON.stringify(snapshot));
      return snapshot;
    }),
  );
  const warnings = [];
  const data = {};
  for (const [index, outcome] of outcomes.entries()) {
    const source = sources[index];
    if (outcome.status === "fulfilled") {
      data[source.key] = outcome.value;
      continue;
    }
    let cached;
    try {
      cached = JSON.parse(readStored(`lottery-v06-${source.key}`));
    } catch {
      /* Ignore invalid cache. */
    }
    const usable =
      cached &&
      typeof cached.text === "string" &&
      Number.isFinite(cached.at) &&
      now >= cached.at &&
      now - cached.at <= MAX_CACHE_AGE &&
      source.valid(cached.text);
    data[source.key] = usable ? cached : { text: "", at: null };
    warnings.push(
      usable
        ? `${source.label}: copia guardada del ${new Date(cached.at).toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}`
        : `${source.label}: no disponibles`,
    );
  }
  const liveEntries = parseLiveEntries(data.live.text);
  return {
    games: games.map((game) =>
      parseGame(data.results.text, liveEntries, game, new Date(now)),
    ),
    warnings,
    sourceDates: { results: data.results.at, live: data.live.at },
  };
}
