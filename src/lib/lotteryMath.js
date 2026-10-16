import { formatMoney } from "../utils/format.js";

const validPrize = (value) => Number.isFinite(value) && value > 0;

export function calculateExpectation(game, { otherWinners = 0 } = {}) {
  const divisor =
    1 +
    (Number.isInteger(otherWinners) && otherWinners >= 0 ? otherWinners : 0);
  const multiplier = game.minimumTicketPrice / game.betPrice;
  const fixedTable = game.fixedRows.length > 0;
  const tableVerified =
    fixedTable && game.advertisedJackpot === game.fixedRows[0].prize * 10;
  const rows = fixedTable
    ? game.fixedRows.map((row) => ({
        ...row,
        expected: tableVerified ? row.prize / row.odds : null,
        source: "tabla-estandar",
      }))
    : game.categories.map((category) => {
        const jackpot = category.key === game.jackpotCategory;
        let prize = jackpot ? game.advertisedJackpot : category.prize;
        let source = jackpot ? "bote-vigente" : "ultimo-resultado";
        // An annuity is a nominal total, never just the monthly instalment.
        if (category.fixedPrize) {
          prize =
            category.key === "first"
              ? game.advertisedJackpot
              : category.fixedPrize;
          source = "renta-nominal";
        }
        // Primitiva's advertised jackpot already includes first-category winnings.
        const odds =
          game.id === "primitiva" && category.key === "first"
            ? category.odds / 0.9
            : category.odds;
        if (jackpot && validPrize(prize)) prize /= divisor;
        const usable = validPrize(prize) && Number.isFinite(odds) && odds > 0;
        return {
          label:
            game.id === "primitiva" && category.key === "first"
              ? "1ª (6 sin reintegro)"
              : category.label,
          prize: usable ? prize : null,
          odds,
          expected: usable ? (prize / odds) * multiplier : null,
          source: usable ? source : "sin-dato",
        };
      });

  for (const extra of game.extraPrizes || []) {
    const usable = validPrize(extra.odds) && validPrize(extra.prize);
    rows.push({
      ...extra,
      expected: usable ? (extra.prize / extra.odds) * multiplier : null,
      source: "ventas-anteriores",
    });
  }

  const missingData = !rows.length || rows.some((row) => row.expected == null);
  const incomplete =
    missingData || Boolean(game.modelNote) || (fixedTable && !tableVerified);
  const knownExpectedPayout = rows.reduce(
    (sum, row) => sum + (row.expected ?? 0),
    0,
  );
  const expectedPayout = incomplete ? null : knownExpectedPayout;
  const topPrize = fixedTable
    ? tableVerified
      ? game.fixedRows[0].prize
      : null
    : game.jackpotCategory
      ? validPrize(game.advertisedJackpot)
        ? game.advertisedJackpot
        : null
      : (rows[0]?.prize ?? null);
  return {
    ...game,
    rows,
    topPrize,
    knownExpectedPayout,
    expectedPayout,
    expectationStatus: incomplete
      ? "incompleta"
      : fixedTable
        ? "tabla-estandar"
        : "estimada",
    expectedNet:
      expectedPayout == null ? null : expectedPayout - game.minimumTicketPrice,
    returnRatio:
      expectedPayout == null ? null : expectedPayout / game.minimumTicketPrice,
    otherWinners: divisor - 1,
  };
}

export function describePrizeSource(source) {
  return (
    {
      "ultimo-resultado":
        "Premio unitario del último resultado; puede variar en el próximo sorteo.",
      "bote-vigente":
        "Bote vigente dividido entre los acertantes del escenario.",
      "tabla-estandar":
        "Tabla de un sorteo ordinario, validada con el primer premio a la serie vigente.",
      "renta-nominal":
        "Suma nominal de mensualidades, sin descuento temporal; sujeta a los límites de reparto del juego.",
      "ventas-anteriores":
        "Estimación con el número de apuestas del último sorteo, no las ventas futuras.",
      "sin-dato": "Sin importe positivo verificable; no se sustituye por cero.",
    }[source] || "Dato orientativo."
  );
}

export function buildDetailMeta(game) {
  const meta = [
    `Sorteo en juego: ${game.drawDate || "no verificado"}`,
    `Último resultado: ${game.resultDate || "no disponible"}`,
  ];
  if (game.topPrize != null)
    meta.push(`Premio máximo anunciado: ${formatMoney(game.topPrize)}`);
  if (game.expectationStatus === "incompleta")
    meta.push(
      game.modelNote ||
        "Estimación incompleta: faltan premios o una tabla vigente verificable.",
    );
  else if (game.expectationStatus === "tabla-estandar")
    meta.push("Tabla estándar de sorteo ordinario.");
  else if (game.id === "eurodreams")
    meta.push(
      "Estimación bruta con suma nominal de rentas vigentes y premios históricos; sujeta a los límites de reparto del juego.",
    );
  else
    meta.push(
      `Estimación bruta con premios históricos y ${game.otherWinners} coacertantes del bote en el escenario.`,
    );
  return meta.join(" | ");
}

export function compareGamesByExpectation(left, right) {
  const a = left.returnRatio ?? Number.NEGATIVE_INFINITY;
  const b = right.returnRatio ?? Number.NEGATIVE_INFINITY;
  return a === b ? left.name.localeCompare(right.name, "es") : b - a;
}

export function getNetClassName(value) {
  return value == null ? "na" : value >= 0 ? "positive" : "negative";
}
