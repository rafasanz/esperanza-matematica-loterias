const MONTHS: Record<string, string> = {
  enero: '01',
  febrero: '02',
  marzo: '03',
  abril: '04',
  mayo: '05',
  junio: '06',
  julio: '07',
  agosto: '08',
  septiembre: '09',
  setiembre: '09',
  octubre: '10',
  noviembre: '11',
  diciembre: '12',
};

/**
 * Extrae el nombre del día de la semana desde una línea de fecha en castellano.
 */
export function extractSpanishWeekday(line: string) {
  const match = line.match(/^(lunes|martes|miércoles|jueves|viernes|sábado|domingo)/i);
  return match ? match[1].toLowerCase() : null;
}

/**
 * Convierte una fecha textual en castellano al formato corto dd/mm/aaaa.
 */
export function formatSpanishDate(line: string) {
  const match = line.match(/(\d{1,2})\s+de\s+([a-záéíóú]+)\s+de\s+(\d{4})/i);

  if (!match) {
    return null;
  }

  const day = String(Number.parseInt(match[1], 10)).padStart(2, '0');
  const month = getSpanishMonthNumber(match[2]);

  if (!month) {
    return null;
  }

  return `${day}/${month}/${match[3]}`;
}

/**
 * Mapea nombres de meses en castellano a su número de dos dígitos.
 */
export function getSpanishMonthNumber(monthName: string) {
  const normalizedMonthName = monthName.toLowerCase();
  if (normalizedMonthName in MONTHS) {
    return MONTHS[normalizedMonthName];
  }

  return null;
}

/**
 * Formatea un importe o devuelve un texto alternativo cuando el dato no existe.
 */
export function formatCurrency(value?: number | null, fallback = '-') {
  if (value == null) {
    return fallback;
  }

  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formatea probabilidades y contadores con separador de miles.
 */
export function formatNumber(value: number) {
  return new Intl.NumberFormat('es-ES').format(Math.round(value || 0));
}
