export function parseEuro(value) {
  const normalized = String(value)
    .replace(/[€\s\u202f]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  return /^\d+(?:\.\d+)?$/.test(normalized) ? Number(normalized) : null;
}

export function formatMoney(value) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatMoneyValue(value, fallback = "-") {
  return Number.isFinite(value) ? formatMoney(value) : fallback;
}

export function formatNumber(value) {
  return new Intl.NumberFormat("es-ES").format(Math.round(value || 0));
}

export function formatBallList(values) {
  if (!values.length) {
    return "-";
  }

  return values.map((value) => String(value).padStart(2, "0")).join(" · ");
}

export function formatPercent(value) {
  return Number.isFinite(value)
    ? new Intl.NumberFormat("es-ES", {
        style: "percent",
        maximumFractionDigits: 1,
      }).format(value)
    : "N/D";
}

export function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
}
