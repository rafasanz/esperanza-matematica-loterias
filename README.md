# Esperanza matemática de loterías

Versión actual: **v0.6**. Aplicación estática en HTML, CSS y JavaScript, sin dependencias de ejecución.

[Abrir aplicación](https://rafasanz.github.io/esperanza-matematica-loterias/)

## Desarrollo

Requiere Node.js 22 o posterior. Los módulos JavaScript deben servirse por HTTP; no abrir el HTML mediante `file://`.

```sh
npm ci
npm start
```

Abrir `http://127.0.0.1:4173`. Se puede cambiar el puerto mediante la variable `PORT`.

```sh
npm test       # Pruebas del cálculo, parser, caché y costes semanales
npm run check  # Sintaxis y formato
npm run format
```

Prettier es una dependencia de desarrollo fijada en el archivo de bloqueo. No se carga en la web.

## Estructura

- `src/config/lottery.js`: precios, categorías y cuotas orientativas.
- `src/lib/lotteryParser.js`: lectura y validación de las fuentes.
- `src/lib/data.js`: carga independiente de fuentes y recuperación de copias guardadas.
- `src/lib/lotteryMath.js`: escenarios, valores esperados y ordenación.
- `src/lib/betSchedule.js`: coste de sorteos pendientes en horario de Madrid.
- `src/ui/`: ranking, simulador, tema y diálogo accesible.
- `src/utils/`: formato, escape de texto y almacenamiento opcional.
- `styles/`: estilos modulares y adaptación al tamaño disponible.
- `tests/`: pruebas con datos sintéticos; no requieren red.

## Fuentes y disponibilidad

Se consultan [resultados SELAE](https://www.loteriasyapuestas.es/es/resultados) y [sorteos en juego](https://www.loteriasyapuestas.es/es/juegos-disponibles-online), a través del lector público `https://r.jina.ai/https://…`, para obtener texto accesible desde el navegador. Se ha eliminado el segundo proxy y la URL duplicada `http://https://`.

Cada petición tiene un límite de 20 segundos. Las fuentes se procesan por separado: si una falla, la otra sigue disponible. Se conserva una copia por fuente en el almacenamiento local durante un máximo de 24 horas; si se usa, la interfaz muestra su fecha. El almacenamiento bloqueado no impide usar la aplicación. Una respuesta sin sorteos válidos no reemplaza la copia anterior. Se muestran siempre los nueve juegos, aunque falten datos.

No se reutilizan el bote ni la fecha de un sorteo resuelto como si fueran actuales. Se descartan fechas en juego pasadas y cierres vencidos. Para categorías variables se requiere un resultado de los últimos 14 días. El formato de SELAE o el servicio de lectura pueden cambiar: en ese caso la aplicación debe mostrar datos incompletos en lugar de inventar premios.

## Método y límites

Para el boleto mínimo:

```text
retorno esperado = suma(probabilidad de categoría × premio unitario) × número de apuestas
esperanza neta = retorno esperado − coste del boleto
retorno por euro = retorno esperado / coste del boleto
```

El ranking se ordena por **retorno bruto por euro**, no por pérdida absoluta por boleto. Un 70 % equivale a una devolución media de 0,70 € por euro. La esperanza neta resta el coste, **antes de impuestos**.

En juegos con bote se combina el importe anunciado para el sorteo en juego con premios unitarios históricos de las otras categorías. Las probabilidades configuradas son aproximadas. Por ello se presenta una **estimación**, nunca una esperanza exacta del próximo sorteo. No predice las ventas futuras ni cuántos acertantes compartirán el bote.

El campo de coacertantes permite un escenario explícito: `premio del bote / (1 + otros acertantes)`. Cero representa un único ganador. Afecta a los botes variables, no a las tablas de Nacional ni a las rentas de EuroDreams. Si falta un premio o una probabilidad, o el premio anterior era cero por no haberse adjudicado, el total se muestra como `N/D`; no se considera un premio futuro de cero euros.

- **Primitiva:** el bote anunciado incluye la primera categoría; el premio histórico de seis aciertos se pondera solo para el caso sin reintegro, evitando sumarlo dos veces dentro del bote.
- **Bonoloto:** se calcula el retorno de dos apuestas de 0,50 €, para el mínimo de 1 €.
- **El Millón:** usa las apuestas recibidas del último sorteo español como aproximación; si falta esa cifra, el total es incompleto.
- **EuroDreams:** el primer premio se obtiene de la renta anunciada para el sorteo vigente, incluidos sorteos especiales. Se suman las mensualidades sin descuento temporal. No es un pago inmediato y los límites de reparto pueden reducirlo. La segunda categoría estándar es 2.000 € al mes durante cinco años. [Información oficial](https://www.loteriasyapuestas.es/es/jugar/eurodreams).
- **Lotería Nacional:** las tablas ordinarias de jueves y sábado suman un retorno bruto del 70 %. Solo se usan si el primer premio a la serie vigente coincide con el estándar de la tabla. Los extraordinarios requieren su propia tabla y no se calculan con una ordinaria. [Reglas e información oficial](https://www.loteriasyapuestas.es/es/centro-de-ayuda/como-se-juega/jugar-a-loteria-nacional).
- **Lototurf y Quíntuple Plus:** se mantienen visibles, con su desglose orientativo, pero sin posición ni total comparable. Las probabilidades dependen de los participantes y de las carreras; no hay un modelo verificado para ellas.

## Simulador y accesibilidad

Permite preparar combinaciones de Primitiva y Euromillones. No valida, guarda ni envía apuestas reales. El reintegro es simulado: el real lo asigna SELAE.

La opción semanal cuenta los sorteos pendientes de la semana de juego en Madrid: lunes, jueves y sábado para Primitiva, martes y viernes para Euromillones. Cuando no queda ninguno, usa la próxima semana. Aplica cierres orientativos de 21:15 y 20:30 respectivamente, actualiza el resumen cada minuto y cobra Joker por cada sorteo. Los horarios excepcionales deben confirmarse en SELAE. [Cómo se juega a Primitiva](https://www.loteriasyapuestas.es/es/centro-de-ayuda/como-se-juega/jugar-a-la-primitiva).

Los iconos de tema y método incluyen ayudas al pasar el cursor o enfocar con teclado. El diálogo gestiona el foco, mantiene el fondo inactivo y se cierra con Escape. Las selecciones se anuncian mediante `aria-pressed`. Los números y etiquetas de fila escalan con el ancho del panel y usan una disposición de cinco columnas en móvil.

## Publicación

GitHub Actions instala las herramientas de desarrollo y ejecuta las pruebas y comprobaciones antes de publicar `main` en GitHub Pages. Las solicitudes de cambios ejecutan las comprobaciones sin desplegar. El artefacto público contiene solo `index.html`, `.nojekyll`, `styles.css`, `src/` y `styles/`; no incluye pruebas, dependencias ni scripts de desarrollo.
