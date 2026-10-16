import {
  calculateExpectation,
  compareGamesByExpectation,
} from "./lib/lotteryMath.js";
import { loadSources } from "./lib/data.js";
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
const otherWinnersInput = document.getElementById("other-winners");
let currentGames = [];
let loading = false;

reloadButton.addEventListener("click", loadData);
otherWinnersInput.addEventListener("input", renderCurrentGames);

initTheme(themeButton);
setupModal({ infoButton, closeModalButton, modal });
setupBettingUI();
loadData();

async function loadData() {
  if (loading) return;
  loading = true;
  reloadButton.disabled = true;
  statusElement.setAttribute("aria-busy", "true");
  statusElement.textContent = "Cargando datos...";

  try {
    const result = await loadSources();
    currentGames = result.games;
    renderCurrentGames();
    statusElement.textContent = result.warnings.length
      ? `Carga parcial. ${result.warnings.join(". ")}. Los datos incompletos aparecen como N/D.`
      : `Fuentes consultadas el ${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}. Las fechas de cada sorteo se muestran en el desglose.`;
  } catch (error) {
    statusElement.textContent = `No se pudieron actualizar los datos: ${error.message}. Se conserva la tabla anterior, si existe.`;
  } finally {
    loading = false;
    reloadButton.disabled = false;
    statusElement.setAttribute("aria-busy", "false");
  }
}

function renderCurrentGames() {
  if (!otherWinnersInput.validity.valid) return;
  const otherWinners = Number(otherWinnersInput.value);
  const ranking = currentGames
    .map((game) => calculateExpectation(game, { otherWinners }))
    .sort(compareGamesByExpectation);
  renderRanking(ranking, rankingBody);
  renderDetails(ranking, details);
}
