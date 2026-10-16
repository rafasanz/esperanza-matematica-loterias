import test from "node:test";
import assert from "node:assert/strict";
import { games, FETCH_URL } from "../src/config/lottery.js";
import {
  calculateExpectation,
  compareGamesByExpectation,
} from "../src/lib/lotteryMath.js";
import {
  normalizeText,
  parseGame,
  parseLiveEntries,
  fetchSource,
} from "../src/lib/lotteryParser.js";
import {
  parseEuro,
  escapeHtml,
  formatMoneyValue,
} from "../src/utils/format.js";
import { getBetCost } from "../src/lib/betSchedule.js";
import { loadSources } from "../src/lib/data.js";

const now = new Date("2026-10-16T12:00:00Z");
const config = (id) => games.find((game) => game.id === id);
const sample = (overrides = {}) => ({
  id: "example",
  name: "Example",
  betPrice: 1,
  minimumTicketPrice: 1,
  fixedRows: [],
  categories: [{ key: "first", label: "Premio", odds: 100, prize: 10 }],
  extraPrizes: [],
  ...overrides,
});
const live =
  "Euromillones\n49\nmillones\nviernes,16 de octubre de 2026-20:30h\nJugar";
const results =
  "Euromillones martes 13/10/2026\n| 1ª 5 + 2 | 0 | 0,00 € | 1 |\nApuestas recibidas: | 3.219.811 | Bote publicitado: | 37.000.000 €";

test("URLs use a single reader and a valid HTTPS source", () => {
  assert.equal(
    FETCH_URL,
    "https://r.jina.ai/https://www.loteriasyapuestas.es/es/resultados",
  );
});
test("Spanish amounts reject malformed or missing values", () => {
  assert.equal(parseEuro("1.234.567,89 €"), 1234567.89);
  assert.equal(parseEuro("12\u202f345,67 €"), 12345.67);
  for (const value of ["", "N/D", "50 euros", "NaN", "1,2,3"])
    assert.equal(parseEuro(value), null);
  assert.equal(formatMoneyValue(NaN, "N/D"), "N/D");
});
test("incomplete lower categories and invalid odds prevent a complete estimate", () => {
  for (const category of [
    { prize: null, odds: 100 },
    { prize: 10, odds: 0 },
    { prize: NaN, odds: 100 },
  ]) {
    const result = calculateExpectation(sample({ categories: [category] }));
    assert.equal(result.expectationStatus, "incompleta");
    assert.equal(result.expectedPayout, null);
  }
});
test("zero prizes for unawarded categories are not a prediction of future zero winnings", () => {
  assert.equal(
    calculateExpectation(sample({ categories: [{ odds: 100, prize: 0 }] }))
      .expectedPayout,
    null,
  );
});
test("missing El Millón sales make the total incomplete", () => {
  assert.equal(
    calculateExpectation(
      sample({ extraPrizes: [{ odds: null, prize: 1000000 }] }),
    ).returnRatio,
    null,
  );
});
test("jackpot sharing scenario reduces only the jackpot contribution", () => {
  const game = sample({ jackpotCategory: "first", advertisedJackpot: 1000 });
  assert.equal(calculateExpectation(game).expectedPayout, 10);
  assert.equal(
    calculateExpectation(game, { otherWinners: 1 }).expectedPayout,
    5,
  );
  assert.equal(
    calculateExpectation(game, { otherWinners: -2 }).expectedPayout,
    10,
  );
});
test("Bonoloto minimum ticket scales expected winnings and cost consistently", () => {
  const result = calculateExpectation(
    sample({ betPrice: 0.5, minimumTicketPrice: 1 }),
  );
  assert.equal(result.expectedPayout, 0.2);
  assert.equal(result.expectedNet, -0.8);
});
test("Primitiva does not count the first category twice within the advertised special jackpot", () => {
  const result = calculateExpectation(
    sample({
      id: "primitiva",
      jackpotCategory: "special",
      advertisedJackpot: 1000,
      categories: [
        { key: "special", odds: 1000 },
        { key: "first", odds: 100, prize: 100 },
      ],
    }),
  );
  assert.ok(Math.abs(result.expectedPayout - 1.9) < 1e-12);
});
test("ranking compares return per euro, keeps incomplete games last and breaks ties", () => {
  const a = { name: "A", returnRatio: 0.5, expectedNet: -0.5 };
  const b = { name: "B", returnRatio: 0.8, expectedNet: -0.6 };
  assert.deepEqual(
    [a, { name: "C", returnRatio: null }, b]
      .sort(compareGamesByExpectation)
      .map((g) => g.name),
    ["B", "A", "C"],
  );
  assert.ok(compareGamesByExpectation({ name: "A" }, { name: "B" }) < 0);
});
test("ordinary Nacional tables return 70% only when matched against the live series prize", () => {
  for (const id of ["loteria-nacional-jueves", "loteria-nacional-sabado"]) {
    const game = {
      ...config(id),
      categories: [],
      extraPrizes: [],
      advertisedJackpot: config(id).fixedRows[0].prize * 10,
    };
    assert.ok(Math.abs(calculateExpectation(game).returnRatio - 0.7) < 1e-12);
    assert.equal(
      calculateExpectation({ ...game, advertisedJackpot: 1500000 }).returnRatio,
      null,
    );
  }
});
test("live parser handles headings, split millions, dates and special EuroDreams annuities", () => {
  const text = normalizeText(
    `## ${live}\nEurodreams\n50.000 €\nlunes,19 de octubre de 2026 - 20:30 h\nJugar\nAl mes durante 30 años`,
  );
  const entries = parseLiveEntries(text);
  assert.equal(entries[0].advertisedJackpot, 49000000);
  assert.equal(entries[1].advertisedJackpot, 18000000);
  assert.equal(entries[1].drawDate, "19/10/2026");
});
test("EuroDreams never uses a monthly instalment as the entire first prize", () => {
  const game = sample({
    id: "eurodreams",
    advertisedJackpot: 18000000,
    categories: [
      { key: "first", fixedPrize: 7200000, prize: 50000, odds: 19191900 },
    ],
  });
  assert.equal(calculateExpectation(game).rows[0].prize, 18000000);
  assert.equal(
    calculateExpectation({ ...game, advertisedJackpot: null }).expectedPayout,
    null,
  );
});
test("parser reads pipe-separated metrics and never reuses a resolved jackpot", () => {
  const game = parseGame(
    results,
    parseLiveEntries(live),
    config("euromillones"),
    now,
  );
  assert.equal(game.advertisedJackpot, 49000000);
  assert.equal(game.betsReceived, 3219811);
  assert.equal(game.resultAdvertisedJackpot, 37000000);
  assert.equal(
    parseGame(results, [], config("euromillones"), now).advertisedJackpot,
    null,
  );
});
test("missing games remain visible and expired live dates are rejected", () => {
  const game = parseGame(
    "",
    parseLiveEntries(live),
    config("euromillones"),
    new Date("2026-10-17T12:00:00Z"),
  );
  assert.equal(game.id, "euromillones");
  assert.equal(game.drawDate, null);
  assert.equal(calculateExpectation(game).returnRatio, null);
});
test("Joker rows cannot fill missing Primitiva categories", () => {
  const text =
    "La Primitiva jueves 15/10/2026\nCategorías Joker\n| 1ª (6 Aciertos) | 1 | 10.000 € |";
  assert.equal(
    parseGame(text, [], config("primitiva"), now).categories.find(
      (row) => row.key === "first",
    ).prize,
    null,
  );
});
test("injection from remote text is escaped before HTML rendering", () => {
  assert.equal(
    escapeHtml('<img src=x onerror="alert(1)">'),
    "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;",
  );
});

test("today's closed draws and results older than 14 days cannot be presented as current", () => {
  const closed = parseGame(
    results,
    parseLiveEntries(live),
    config("euromillones"),
    new Date("2026-10-16T18:30:00Z"),
  );
  assert.equal(closed.drawDate, null);
  const old = parseGame(
    results.replace("13/10/2026", "01/09/2026"),
    parseLiveEntries(live),
    config("euromillones"),
    now,
  );
  assert.equal(calculateExpectation(old).expectedPayout, null);
  const invalid = parseLiveEntries(
    live.replace("16 de octubre", "32 de octubre"),
  );
  assert.equal(
    parseGame(results, invalid, config("euromillones"), now).drawDate,
    null,
  );
});

test("fetch timeout aborts a stalled source", async () => {
  await assert.rejects(
    fetchSource("url", "results", {
      timeoutMs: 10,
      fetchImpl: (_url, { signal }) =>
        new Promise((_resolve, reject) => {
          const keepAlive = setTimeout(
            () => reject(new Error("timeout did not abort")),
            500,
          );
          signal.addEventListener(
            "abort",
            () => {
              clearTimeout(keepAlive);
              reject(signal.reason);
            },
            { once: true },
          );
        }),
    }),
    /timeout|aborted/i,
  );
});
test("weekly cost counts pending Madrid draws and charges Joker per draw", () => {
  assert.deepEqual(
    getBetCost("primitiva", true, true, new Date("2026-10-12T10:00:00Z")),
    { draws: 3, total: 6 },
  );
  assert.deepEqual(getBetCost("primitiva", true, true, now), {
    draws: 1,
    total: 2,
  });
  assert.deepEqual(
    getBetCost("primitiva", true, false, new Date("2026-10-17T19:15:00Z")),
    { draws: 3, total: 3 },
  );
  assert.deepEqual(
    getBetCost("euromillones", true, false, new Date("2026-10-13T10:00:00Z")),
    { draws: 2, total: 5 },
  );
  assert.deepEqual(getBetCost("euromillones", true, false, now), {
    draws: 1,
    total: 2.5,
  });
});
test("fetch errors include HTTP status and reject geoblocking", async () => {
  await assert.rejects(
    fetchSource("url", "results", {
      fetchImpl: async () => new Response("", { status: 503 }),
    }),
    /503/,
  );
  await assert.rejects(
    fetchSource("url", "results", {
      fetchImpl: async () => new Response("informacion-geobloqueo-pais"),
    }),
    /no disponible/,
  );
});
test("partial source failures preserve independent data and dated cache expires after 24h", async () => {
  const stored = new Map();
  globalThis.localStorage = {
    getItem: (key) => stored.get(key) ?? null,
    setItem: (key, value) => stored.set(key, value),
  };
  const fresh = await loadSources({
    now: +now,
    fetcher: async (url) => (url.includes("resultados") ? results : live),
  });
  assert.equal(fresh.warnings.length, 0);
  const cached = await loadSources({
    now: +now + 1000,
    fetcher: async () => {
      throw new Error("offline");
    },
  });
  assert.equal(cached.warnings.length, 2);
  assert.match(cached.warnings[0], /copia guardada/);
  assert.equal(cached.games[0].advertisedJackpot, 49000000);
  const expired = await loadSources({
    now: +now + 86400001,
    fetcher: async () => {
      throw new Error("offline");
    },
  });
  assert.equal(expired.games[0].advertisedJackpot, null);
  stored.clear();
  const partial = await loadSources({
    now: +now,
    fetcher: async (url) => {
      if (url.includes("resultados")) throw new Error("offline");
      return live;
    },
  });
  assert.equal(partial.games[0].advertisedJackpot, 49000000);
  assert.equal(partial.games.length, games.length);
  delete globalThis.localStorage;
});
