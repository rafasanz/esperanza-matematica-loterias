const schedules = {
  primitiva: { days: [1, 4, 6], cutoff: 21 * 60 + 15, price: 1 },
  euromillones: { days: [2, 5], cutoff: 20 * 60 + 30, price: 2.5 },
};

export function getBetCost(gameId, weekly, joker = false, now = new Date()) {
  const schedule = schedules[gameId];
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Madrid",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map(({ type, value }) => [type, value]),
  );
  const weekday =
    new Date(
      Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day)),
    ).getUTCDay() || 7;
  const minutes = Number(parts.hour) * 60 + Number(parts.minute);
  const remaining = schedule.days.filter(
    (day) => day > weekday || (day === weekday && minutes < schedule.cutoff),
  ).length;
  const draws = weekly ? remaining || schedule.days.length : 1;
  return {
    draws,
    total: draws * (schedule.price + (gameId === "primitiva" && joker ? 1 : 0)),
  };
}
