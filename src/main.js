import { FETCH_URL, LIVE_FETCH_URL, games } from "./config/lottery.js";
import { calculateExpectation, compareGamesByExpectation } from "./lib/lotteryMath.js";
import { fetchSource, normalizeText, parseGame, parseLiveEntries } from "./lib/lotteryParser.js";
import { setupBettingUI } from "./ui/betting.js";
import { setupModal } from "./ui/modal.js";
import { renderDetails, renderRanking } from "./ui/ranking.js";
import { initTheme } from "./ui/theme.js";

const rankingBody = document.getElementById("ranking");
const details = document.getElementById("details");
const statusElement = document.getElementById("status");
const reloadButton = document.getElementById("reload");
const themeButton = document.getElementById("theme-button");
const infoButton = document.getElementById("info-button");
const closeModalButton = document.getElementById("close-modal");
const modal = document.getElementById("modal");

reloadButton.addEventListener("click", loadData);

initTheme(themeButton);
setupModal({ infoButton, closeModalButton, modal });
setupBettingUI();
loadData();

async function loadData() {
  statusElement.textContent = "Cargando datos...";
  rankingBody.innerHTML = "";
  details.innerHTML = "";

  try {
    const [resultsText, liveGamesText] = await Promise.all([
      fetchSource(FETCH_URL, "resultados"),
      fetchSource(LIVE_FETCH_URL, "ahora en juego")
    ]);
    const normalized = normalizeText(resultsText);
    const liveEntries = parseLiveEntries(normalizeText(liveGamesText));
    const ranking = games
      .map((game) => parseGame(normalized, liveEntries, game))
      .filter(Boolean)
      .map(calculateExpectation)
      .sort(compareGamesByExpectation);

    if (!ranking.length) {
      throw new Error("No he podido extraer sorteos válidos.");
    }

    renderRanking(ranking, rankingBody);
    renderDetails(ranking, details);
    statusElement.textContent = `Datos cargados el ${new Date().toLocaleString("es-ES")}.`;
  } catch (error) {
    statusElement.textContent = `No se pudieron cargar los datos: ${error.message}`;
  }
}
