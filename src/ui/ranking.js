import {
  buildDetailMeta,
  describePrizeSource,
  getNetClassName,
} from "../lib/lotteryMath.js";
import {
  escapeHtml,
  formatMoney,
  formatMoneyValue,
  formatNumber,
  formatPercent,
} from "../utils/format.js";

export function renderRanking(ranking, rankingBody) {
  rankingBody.innerHTML = ranking
    .map(
      (game, index) => `
    <tr>
      <td>${game.returnRatio == null ? "—" : index + 1}</td>
      <td>${escapeHtml(game.name)}<span class="estimate-label">${game.expectationStatus === "incompleta" ? "Datos incompletos" : game.expectationStatus === "tabla-estandar" ? "Tabla ordinaria" : "Estimación"}</span></td>
      <td class="date-cell">${escapeHtml(game.drawDate || "N/D")}</td>
      <td class="money-cell ${game.topPrize == null ? "na" : ""}">${formatMoneyValue(game.topPrize, "N/D")}</td>
      <td class="money-cell">${formatMoney(game.minimumTicketPrice)}</td>
      <td class="money-cell ${game.expectedPayout == null ? "na" : ""}">${formatMoneyValue(game.expectedPayout, "N/D")}</td>
      <td class="money-cell ${getNetClassName(game.expectedNet)}">${formatMoneyValue(game.expectedNet, "N/D")}</td>
      <td class="money-cell">${formatPercent(game.returnRatio)}</td>
    </tr>
  `,
    )
    .join("");
}

export function renderDetails(ranking, details) {
  details.innerHTML = ranking
    .map(
      (game) => `
    <article class="detail-card">
      <h2>${escapeHtml(game.name)}</h2>
      <p class="detail-meta">${escapeHtml(buildDetailMeta(game))}</p>
      <div class="detail-grid">
        ${game.rows
          .map(
            (row) => `
          <article class="detail-item">
            <h3>${escapeHtml(row.label)}</h3>
            <p><strong>Premio usado:</strong> ${formatMoneyValue(row.prize, "N/D")}</p>
            <p><strong>Probabilidad orientativa:</strong> ${Number.isFinite(row.odds) && row.odds > 0 ? `1 entre ${formatNumber(row.odds)}` : "N/D"}</p>
            <p><strong>Valor esperado:</strong> ${formatMoneyValue(row.expected, "N/D")}</p>
            <p class="detail-item-source">${describePrizeSource(row.source)}</p>
          </article>
        `,
          )
          .join("")}
      </div>
    </article>
  `,
    )
    .join("");
}
