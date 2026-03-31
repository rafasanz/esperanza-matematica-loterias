type ElementWithDataset = Element & { dataset: Record<string, unknown> };

export function elementHasDataSet(
  element: Element,
): element is ElementWithDataset {
  if ('dataset' in element) {
    return true;
  }
  return false;
}
