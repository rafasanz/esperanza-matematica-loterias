import { buildDetailMeta, describePrizeSource, getNetClassName } from "../lib/lotteryMath.js";
import { formatMoney, formatMoneyValue, formatNumber } from "../utils/format.js";

export function renderRanking(ranking, rankingBody) {
  rankingBody.innerHTML = ranking.map((game, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${game.name}</td>
      <td class="date-cell">${game.drawDate || "-"}</td>
      <td class="money-cell ${game.topPrize == null ? "na" : ""}">${formatMoneyValue(game.topPrize, "N/D")}</td>
      <td class="money-cell">${formatMoney(game.minimumTicketPrice)}</td>
      <td class="money-cell ${game.expectedPayout == null ? "na" : ""}">${formatMoneyValue(game.expectedPayout, "N/D")}</td>
      <td class="money-cell ${getNetClassName(game.expectedNet)}">${formatMoneyValue(game.expectedNet, "N/D")}</td>
    </tr>
  `).join("");
}

export function renderDetails(ranking, details) {
  details.innerHTML = ranking.map((game) => `
    <article class="detail-card">
      <h2>${game.name}</h2>
      <p class="detail-meta">${buildDetailMeta(game)}</p>
      <div class="detail-grid">
        ${game.rows.map((row) => `
          <article class="detail-item">
            <h3>${row.label}</h3>
            <p><strong>Premio usado:</strong> ${formatMoneyValue(row.prize, "N/D")}</p>
            <p><strong>Probabilidad:</strong> 1 entre ${formatNumber(row.odds)}</p>
            <p><strong>Valor esperado:</strong> ${formatMoneyValue(row.expected, "N/D")}</p>
            <p class="detail-item-source">${describePrizeSource(row.source)}</p>
          </article>
        `).join("")}
      </div>
    </article>
  `).join("");
}
