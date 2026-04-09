import { formatMoney } from "../utils/format.js";

export function calculateExpectation(game) {
  if (game.fixedRows.length > 0) {
    const rows = game.fixedRows.map((row) => ({
      label: row.label,
      prize: row.prize,
      odds: row.odds,
      expected: row.prize / row.odds
    }));

    const expectedPayout = rows.reduce((total, row) => total + row.expected, 0);

    return {
      ...game,
      rows,
      topPrize: rows.length ? Math.max(...rows.map((row) => row.prize)) : 0,
      expectationStatus: "exacta",
      expectedPayout,
      expectedNet: expectedPayout - game.minimumTicketPrice
    };
  }

  const multiplier = game.minimumTicketPrice / game.betPrice;
  const rows = [];
  let missingCurrentTopPrize = false;

  for (const category of game.categories) {
    if (!category.odds) {
      continue;
    }

    let effectivePrize = category.prize;
    let prizeSource = category.prize ? "ultimo-resultado" : "sin-dato";
    const isJackpotCategory = game.jackpotCategory === category.key;

    if (isJackpotCategory) {
      if (game.advertisedJackpot) {
        effectivePrize = game.advertisedJackpot;
        prizeSource = game.advertisedJackpotSource || "bote-vigente";
      } else {
        effectivePrize = null;
        prizeSource = "vigente-no-publicado";
        missingCurrentTopPrize = true;
      }
    }

    if ((!effectivePrize || effectivePrize === 0) && category.fixedPrize) {
      effectivePrize = category.fixedPrize;
      prizeSource = "premio-fijo";
    }

    rows.push({
      label: category.label,
      prize: effectivePrize,
      odds: category.odds,
      expected: effectivePrize == null ? null : (effectivePrize / category.odds) * multiplier,
      source: prizeSource
    });
  }

  for (const extraPrize of game.extraPrizes) {
    if (!extraPrize.odds || !extraPrize.prize) {
      continue;
    }

    rows.push({
      label: extraPrize.label,
      prize: extraPrize.prize,
      odds: extraPrize.odds,
      expected: (extraPrize.prize / extraPrize.odds) * multiplier,
      source: "premio-fijo"
    });
  }

  const knownExpectedPayout = rows.reduce((total, row) => total + (row.expected || 0), 0);
  const expectedPayout = missingCurrentTopPrize ? null : knownExpectedPayout;

  return {
    ...game,
    rows,
    topPrize: missingCurrentTopPrize ? null : (rows.length ? Math.max(...rows.map((row) => row.prize || 0)) : null),
    expectationStatus: missingCurrentTopPrize ? "pendiente-premio-maximo" : "exacta",
    knownExpectedPayout,
    expectedPayout,
    expectedNet: expectedPayout == null ? null : expectedPayout - game.minimumTicketPrice
  };
}

export function describePrizeSource(source) {
  const labels = {
    "ultimo-resultado": "último resultado publicado",
    "bote-vigente": "sorteo en juego",
    "bote-acumulado": "último bote acumulado sin acertantes",
    "premio-fijo": "importe fijo",
    "premio-resuelto": "no reutilizado: ya adjudicado",
    "vigente-no-publicado":
      "La Sociedad Estatal de Loterías y Apuestas del Estado (SELAE) no publica el premio máximo vigente y el último ya resuelto no se reutiliza",
    "sin-bote-vigente": "sin bote vigente publicado",
    "sin-dato": "sin dato oficial suficiente"
  };

  return labels[source] || "dato disponible";
}

export function buildDetailMeta(game) {
  const meta = [`Próximo sorteo: ${game.drawDate || "-"}`];

  if (game.resultDate) {
    meta.push(`Último resultado consultado: ${game.resultDate}`);
  }

  if (game.fixedRows.length > 0) {
    meta.push(`Máxima categoría usada: ${formatMoney(game.topPrize)}`);
    return meta.join(" | ");
  }

  if (game.advertisedJackpot) {
    meta.push(`Premio máximo vigente usado: ${formatMoney(game.advertisedJackpot)}`);
  } else {
    meta.push(
      "Premio máximo vigente: no publicado por la Sociedad Estatal de Loterías y Apuestas del Estado (SELAE) para el sorteo en juego"
    );
  }

  if (game.expectationStatus !== "exacta") {
    meta.push(
      "Esperanza matemática exacta: no disponible hasta que la Sociedad Estatal de Loterías y Apuestas del Estado (SELAE) publique la categoría máxima vigente"
    );
  }

  return meta.join(" | ");
}

export function compareGamesByExpectation(left, right) {
  const leftValue = left.expectedNet == null ? Number.NEGATIVE_INFINITY : left.expectedNet;
  const rightValue = right.expectedNet == null ? Number.NEGATIVE_INFINITY : right.expectedNet;

  if (rightValue !== leftValue) {
    return rightValue - leftValue;
  }

  return left.name.localeCompare(right.name, "es");
}

export function getNetClassName(value) {
  if (value == null) {
    return "na";
  }

  return value >= 0 ? "positive" : "negative";
}
