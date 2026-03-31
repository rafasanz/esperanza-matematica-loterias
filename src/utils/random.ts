/**
 * Genera una lista de números aleatorios no repetidos dentro de un rango.
 */
export function pickRandomUnique(count: number, min: number, max: number): number[] {
  const values = new Set<number>();

  while (values.size < count) {
    values.add(randomBetween(min, max));
  }

  return [...values];
}

/**
 * Devuelve un entero aleatorio dentro de un rango inclusivo.
 */
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
