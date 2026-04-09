export function parseEuro(value) {
  return Number.parseFloat(String(value).replace(/[€\s]/g, "").replace(/\./g, "").replace(",", "."));
}

export function formatMoney(value) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2
  }).format(value || 0);
}

export function formatMoneyValue(value, fallback = "-") {
  return value == null ? fallback : formatMoney(value);
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
