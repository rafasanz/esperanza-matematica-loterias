/**
 * Descarga una fuente remota y normaliza los errores HTTP para mostrarlos en la UI.
 */
export async function fetchSource(url: string, label: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw Error(`${label}: HTTP ${response.status}`);
  }

  return response.text();
}
