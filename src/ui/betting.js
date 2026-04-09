import { formatBallList, formatMoney } from "../utils/format.js";

let elements = null;
let initialized = false;

const betState = {
  activeGame: "primitiva",
  primitiva: createInitialPrimitivaState(),
  euromillones: createInitialEuromillonesState()
};

export function setupBettingUI() {
  if (initialized) {
    return;
  }

  elements = getBettingElements();
  initialized = true;

  buildBallGrid(elements.primitivaGrid, 49, "primitiva-number", { startAt: 1, groupSize: 10 });
  buildBallGrid(elements.primitivaReintegroGrid, 10, "primitiva-reintegro", { startAt: 0, compact: true });
  buildBallGrid(elements.euromillonesGrid, 50, "euromillones-number", { startAt: 1, groupSize: 10 });
  buildBallGrid(elements.euromillonesStarsGrid, 12, "euromillones-star", { startAt: 1, groupSize: 6, isStar: true });

  elements.primitivaRandomButton.addEventListener("click", () => {
    betState.primitiva.numbers = pickRandomUnique(6, 1, 49).sort((left, right) => left - right);
    refreshBetButtons();
    renderBetSummary();
  });

  elements.primitivaReintegroRandomButton.addEventListener("click", () => {
    betState.primitiva.reintegro = randomBetween(0, 9);
    refreshBetButtons();
    renderBetSummary();
  });

  elements.euromillonesRandomButton.addEventListener("click", () => {
    betState.euromillones.numbers = pickRandomUnique(5, 1, 50).sort((left, right) => left - right);
    refreshBetButtons();
    renderBetSummary();
  });

  elements.euromillonesStarsRandomButton.addEventListener("click", () => {
    betState.euromillones.stars = pickRandomUnique(2, 1, 12).sort((left, right) => left - right);
    refreshBetButtons();
    renderBetSummary();
  });

  elements.primitivaJoker.addEventListener("change", (event) => {
    betState.primitiva.joker = event.target.checked;
    renderBetSummary();
  });

  elements.primitivaDrawButtons.forEach((button) => {
    button.addEventListener("click", () => {
      elements.primitivaDrawButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      betState.primitiva.draw = button.dataset.primitivaDraw;
      renderBetSummary();
    });
  });

  elements.euromillonesDrawButtons.forEach((button) => {
    button.addEventListener("click", () => {
      elements.euromillonesDrawButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      betState.euromillones.draw = button.dataset.euromillonesDraw;
      renderBetSummary();
    });
  });

  elements.betClear.addEventListener("click", clearActiveBet);
  elements.gameTabs.forEach((tab) => {
    tab.addEventListener("click", () => setActiveBetGame(tab.dataset.gameTab));
  });

  refreshBetButtons();
  renderBetSummary();
}

function getBettingElements() {
  return {
    gameTabs: document.querySelectorAll("[data-game-tab]"),
    betPanels: document.querySelectorAll("[data-bet-panel]"),
    primitivaDrawButtons: document.querySelectorAll("[data-primitiva-draw]"),
    euromillonesDrawButtons: document.querySelectorAll("[data-euromillones-draw]"),
    primitivaGrid: document.getElementById("primitiva-grid"),
    primitivaReintegroGrid: document.getElementById("primitiva-reintegro-grid"),
    euromillonesGrid: document.getElementById("euromillones-grid"),
    euromillonesStarsGrid: document.getElementById("euromillones-stars-grid"),
    primitivaRandomButton: document.getElementById("primitiva-random"),
    primitivaReintegroRandomButton: document.getElementById("primitiva-reintegro-random"),
    euromillonesRandomButton: document.getElementById("euromillones-random"),
    euromillonesStarsRandomButton: document.getElementById("euromillones-stars-random"),
    primitivaJoker: document.getElementById("primitiva-joker"),
    betSummaryGame: document.getElementById("bet-summary-game"),
    betSummaryNumbers: document.getElementById("bet-summary-numbers"),
    betSummaryStars: document.getElementById("bet-summary-stars"),
    betSummaryStarsRow: document.getElementById("bet-summary-stars-row"),
    betSummaryReintegro: document.getElementById("bet-summary-reintegro"),
    betSummaryReintegroRow: document.getElementById("bet-summary-reintegro-row"),
    betSummaryExtra: document.getElementById("bet-summary-extra"),
    betSummaryExtraRow: document.getElementById("bet-summary-extra-row"),
    betSummaryDraw: document.getElementById("bet-summary-draw"),
    betSummaryTotal: document.getElementById("bet-summary-total"),
    betFeedback: document.getElementById("bet-feedback"),
    betClear: document.getElementById("bet-clear")
  };
}

function createInitialPrimitivaState() {
  return {
    draw: "proximo",
    numbers: [],
    reintegro: null,
    joker: false
  };
}

function createInitialEuromillonesState() {
  return {
    draw: "proximo",
    numbers: [],
    stars: []
  };
}

function buildBallGrid(container, count, type, options = {}) {
  const startAt = options.startAt ?? 1;
  const groupSize = options.groupSize ?? count;
  const isStar = options.isStar ?? false;
  const compact = options.compact ?? false;
  const groups = [];

  if (compact) {
    const items = [];

    for (let value = startAt; value < startAt + count; value += 1) {
      items.push(createBallMarkup(type, value, isStar));
    }

    container.innerHTML = items.join("");
  } else {
    for (let value = startAt; value < startAt + count; value += groupSize) {
      const values = [];
      const maxValue = Math.min(value + groupSize - 1, startAt + count - 1);

      for (let current = value; current <= maxValue; current += 1) {
        values.push(createBallMarkup(type, current, isStar));
      }

      groups.push(`
        <div class="ball-row">
          <div class="ball-row-label">${String(value).padStart(2, "0")}-${String(maxValue).padStart(2, "0")}</div>
          <div class="ball-row-items" style="--row-count:${groupSize}">${values.join("")}</div>
        </div>
      `);
    }

    container.innerHTML = groups.join("");
  }

  container.querySelectorAll("[data-ball-type]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleBall(type, Number(button.dataset.ballValue));
    });
  });
}

function createBallMarkup(type, value, isStar) {
  return `
    <button
      type="button"
      class="ball${isStar ? " star-ball" : ""}"
      data-ball-type="${type}"
      data-ball-value="${value}"
    >
      ${isStar ? `
        <svg class="star-shape" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <polygon points="50,1 61,35 98,35 68,57 79,95 50,73 21,95 32,57 2,35 39,35"></polygon>
        </svg>
      ` : ""}
      <span class="ball-text">${String(value).padStart(2, "0")}</span>
    </button>
  `;
}

function toggleBall(type, value) {
  if (type === "primitiva-number") {
    toggleSelection(betState.primitiva.numbers, value, 6);
  }

  if (type === "primitiva-reintegro") {
    betState.primitiva.reintegro = betState.primitiva.reintegro === value ? null : value;
  }

  if (type === "euromillones-number") {
    toggleSelection(betState.euromillones.numbers, value, 5);
  }

  if (type === "euromillones-star") {
    toggleSelection(betState.euromillones.stars, value, 2);
  }

  refreshBetButtons();
  renderBetSummary();
}

function toggleSelection(list, value, maxItems) {
  const index = list.indexOf(value);

  if (index >= 0) {
    list.splice(index, 1);
    return;
  }

  if (list.length >= maxItems) {
    return;
  }

  list.push(value);
  list.sort((left, right) => left - right);
}

function refreshBetButtons() {
  document.querySelectorAll("[data-ball-type]").forEach((button) => {
    const type = button.dataset.ballType;
    const value = Number(button.dataset.ballValue);
    let active = false;

    if (type === "primitiva-number") {
      active = betState.primitiva.numbers.includes(value);
    }

    if (type === "primitiva-reintegro") {
      active = betState.primitiva.reintegro === value;
    }

    if (type === "euromillones-number") {
      active = betState.euromillones.numbers.includes(value);
    }

    if (type === "euromillones-star") {
      active = betState.euromillones.stars.includes(value);
    }

    button.classList.toggle("active", active);
  });
}

function setActiveBetGame(gameId) {
  betState.activeGame = gameId;
  elements.gameTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.gameTab === gameId));
  elements.betPanels.forEach((panel) => panel.classList.toggle("active", panel.dataset.betPanel === gameId));
  renderBetSummary();
}

function renderBetSummary() {
  if (betState.activeGame === "primitiva") {
    const total = 1 + (betState.primitiva.joker ? 1 : 0);
    elements.betSummaryGame.textContent = "La Primitiva";
    elements.betSummaryNumbers.textContent = formatBallList(betState.primitiva.numbers);
    elements.betSummaryStarsRow.classList.add("hidden-row");
    elements.betSummaryReintegroRow.classList.remove("hidden-row");
    elements.betSummaryExtraRow.classList.remove("hidden-row");
    elements.betSummaryReintegro.textContent = betState.primitiva.reintegro === null ? "-" : String(betState.primitiva.reintegro);
    elements.betSummaryExtra.textContent = betState.primitiva.joker ? "Con Joker" : "Sin Joker";
    elements.betSummaryDraw.textContent = betState.primitiva.draw === "semanal" ? "Semanal" : "Próximo sorteo";
    elements.betSummaryTotal.textContent = formatMoney(total);
  }

  if (betState.activeGame === "euromillones") {
    const total = betState.euromillones.draw === "semana" ? 5 : 2.5;
    elements.betSummaryGame.textContent = "Euromillones";
    elements.betSummaryNumbers.textContent = formatBallList(betState.euromillones.numbers);
    elements.betSummaryStarsRow.classList.remove("hidden-row");
    elements.betSummaryReintegroRow.classList.add("hidden-row");
    elements.betSummaryExtraRow.classList.add("hidden-row");
    elements.betSummaryStars.textContent = formatBallList(betState.euromillones.stars);
    elements.betSummaryDraw.textContent = betState.euromillones.draw === "semana" ? "Dos sorteos de la semana" : "Próximo sorteo";
    elements.betSummaryTotal.textContent = formatMoney(total);
  }

  elements.betFeedback.textContent = "";
}

function clearActiveBet() {
  if (betState.activeGame === "primitiva") {
    betState.primitiva = createInitialPrimitivaState();
    elements.primitivaDrawButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.primitivaDraw === "proximo");
    });
    elements.primitivaJoker.checked = false;
  }

  if (betState.activeGame === "euromillones") {
    betState.euromillones = createInitialEuromillonesState();
    elements.euromillonesDrawButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.euromillonesDraw === "proximo");
    });
  }

  refreshBetButtons();
  renderBetSummary();
  elements.betFeedback.textContent = "Apuesta limpiada.";
}

function pickRandomUnique(count, min, max) {
  const values = new Set();

  while (values.size < count) {
    values.add(randomBetween(min, max));
  }

  return [...values];
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
