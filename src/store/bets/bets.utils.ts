/**
 * Añade o quita un valor de una selección limitada y la mantiene ordenada.
 */
export function toggleSelection(list: number[], value: number, maxItems: number) {
  const index = list.indexOf(value);

  if (index >= 0) {
    list.splice(index, 1);
    return list;
  }

  if (list.length >= maxItems) {
    return list;
  }

  list.push(value);
  list.sort((a, b) => a - b);

  return list;
}

export function formatBallList(values: number[]) {
  if (!values.length) {
    return '-';
  }

  return values.map((value) => String(value).padStart(2, '0')).join(' · ');
}
