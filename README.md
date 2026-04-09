# Esperanza matemática de sorteos de la Sociedad Estatal de Loterías y Apuestas del Estado (SELAE)

Desarrollada con TypeScript usando React y Redux.

## Live demo

Clic [aquí](https://rafasanz.github.io/esperanza-matematica-loterias/) para verlo en vivo.

## Cómo usarla

Las dependencias están gestionadas usando [pnpm](https://pnpm.io/installation), aunque también debería funcionar con npm o yarn.

Instala las dependencias y arranca el servidor de desarrollo:

```bash
pnpm install
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173/esperanza-matematica-loterias/`.

## Otros detalles

La página intenta leer datos oficiales de:

- `https://www.loteriasyapuestas.es/es/resultados`
- `https://www.loteriasyapuestas.es/es/juegos-disponibles-online`

Como la Sociedad Estatal de Loterías y Apuestas del Estado (SELAE) no suele permitir acceso directo desde navegador por CORS, el script usa un proxy público de solo lectura para poder cargar esos datos desde cliente puro y después calcula el ranking en el propio navegador.

### Qué calcula

- Euromillones
- Lotería Nacional (jueves)
- Lotería Nacional (sábado)
- La Primitiva
- Bonoloto
- El Gordo de la Primitiva
- EuroDreams
- Lototurf
- Quíntuple Plus

La esperanza matemática se estima con:

- apuesta mínima del sorteo
- premio mostrado por categoría
- bote vigente del sorteo en juego cuando la Sociedad Estatal de Loterías y Apuestas del Estado (SELAE) lo publica
- probabilidades oficiales aproximadas de cada juego
- en Lotería Nacional, tabla oficial estándar de premios de jueves y sábado

Para evitar errores con premios ya adjudicados, la categoría máxima no reutiliza automáticamente el premio del último sorteo resuelto. Si el bote vigente no aparece publicado para el sorteo en juego, la app lo deja fuera antes que arrastrar un importe antiguo.

Cuando falta ese dato oficial, la tabla muestra `N/D` en `Premio máxima categoría`, `Retorno esperado` y `Esperanza neta` para ese sorteo, en lugar de inventar o degradar el cálculo con una categoría inferior.

La interfaz incluye un botón `Cómo se calcula` en la parte superior derecha con un resumen del método.

También incluye un apartado visual para preparar apuestas de:

- La Primitiva
- Euromillones

Ese bloque está inspirado en la estructura del portal oficial de juego, pero no envía apuestas reales.

No se incluyen Joker, Quiniela ni Quinigol.
