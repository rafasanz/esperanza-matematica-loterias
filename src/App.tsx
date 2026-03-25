import './App.css';
import { Header } from './components/Header/Header';

// const SOURCE_URL = 'https://www.loteriasyapuestas.es/es/resultados';
// const FETCH_URL = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(`https://r.jina.ai/http://${SOURCE_URL}`)}`;
// const LIVE_SOURCE_URL =
//   'https://www.loteriasyapuestas.es/es/juegos-disponibles-online';
// const LIVE_FETCH_URL = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(`https://r.jina.ai/http://${LIVE_SOURCE_URL}`)}`;

// const loteriaNacionalJuevesRows = [
//   { label: '1er premio', prize: 30000, odds: 100000 },
//   { label: '2º premio', prize: 6000, odds: 100000 },
//   { label: '4 cifras', prize: 75, odds: 2500 },
//   { label: '3 cifras', prize: 15, odds: 100000 / 700 },
//   { label: '2 cifras', prize: 6, odds: 100000 / 9000 },
//   { label: 'Aprox. 1er premio', prize: 1200, odds: 50000 },
//   { label: 'Aprox. 2º premio', prize: 747, odds: 50000 },
//   { label: 'Centena 1er premio', prize: 30, odds: 100000 / 99 },
//   { label: 'Centena 2º premio', prize: 15, odds: 100000 / 99 },
//   { label: 'Últimas 4 del 1er premio', prize: 75, odds: 100000 / 9 },
//   { label: 'Últimas 3 del 1er premio', prize: 15, odds: 100000 / 99 },
//   { label: 'Últimas 2 del 1er premio', prize: 6, odds: 100000 / 999 },
//   { label: 'Reintegro 1er premio', prize: 3, odds: 100000 / 9999 },
//   { label: '1ª extracción especial', prize: 3, odds: 10 },
//   { label: '2ª extracción especial', prize: 3, odds: 10 },
// ];

// const loteriaNacionalSabadoRows = [
//   { label: '1er premio', prize: 60000, odds: 100000 },
//   { label: '2º premio', prize: 12000, odds: 100000 },
//   { label: '4 cifras', prize: 150, odds: 2500 },
//   { label: '3 cifras', prize: 30, odds: 100 },
//   { label: '2 cifras', prize: 12, odds: 100000 / 9000 },
//   { label: 'Aprox. 1er premio', prize: 1000, odds: 50000 },
//   { label: 'Aprox. 2º premio', prize: 554, odds: 50000 },
//   { label: 'Centena 1er premio', prize: 30, odds: 100000 / 99 },
//   { label: 'Centena 2º premio', prize: 30, odds: 100000 / 99 },
//   { label: 'Últimas 3 del 1er premio', prize: 30, odds: 100000 / 99 },
//   { label: 'Últimas 2 del 1er premio', prize: 12, odds: 100000 / 999 },
//   { label: 'Reintegro 1er premio', prize: 6, odds: 100000 / 9999 },
//   { label: '1ª extracción especial', prize: 6, odds: 10 },
//   { label: '2ª extracción especial', prize: 6, odds: 10 },
// ];

// const games = [
//   {
//     id: 'euromillones',
//     name: 'Euromillones',
//     startsWith: 'Euromillones ',
//     liveName: 'Euromillones',
//     betPrice: 2.5,
//     minimumTicketPrice: 2.5,
//     jackpotCategory: '1',
//     categories: [
//       { key: '1', label: '1ª (5+2)', aliases: ['1ª 5 + 2'], odds: 139838160 },
//       { key: '2', label: '2ª (5+1)', aliases: ['2ª 5 + 1'], odds: 6991908 },
//       { key: '3', label: '3ª (5+0)', aliases: ['3ª 5 + 0'], odds: 3107515 },
//       { key: '4', label: '4ª (4+2)', aliases: ['4ª 4 + 2'], odds: 621503 },
//       { key: '5', label: '5ª (4+1)', aliases: ['5ª 4 + 1'], odds: 31075 },
//       { key: '6', label: '6ª (3+2)', aliases: ['6ª 3 + 2'], odds: 14125 },
//       { key: '7', label: '7ª (4+0)', aliases: ['7ª 4 + 0'], odds: 13811 },
//       { key: '8', label: '8ª (2+2)', aliases: ['8ª 2 + 2'], odds: 985 },
//       { key: '9', label: '9ª (3+1)', aliases: ['9ª 3 + 1'], odds: 706 },
//       { key: '10', label: '10ª (3+0)', aliases: ['10ª 3 + 0'], odds: 314 },
//       { key: '11', label: '11ª (1+2)', aliases: ['11ª 1 + 2'], odds: 188 },
//       { key: '12', label: '12ª (2+1)', aliases: ['12ª 2 + 1'], odds: 49 },
//       { key: '13', label: '13ª (2+0)', aliases: ['13ª 2 + 0'], odds: 22 },
//     ],
//     extraPrizes: [{ label: 'El Millón', oddsFromBets: true, prize: 1000000 }],
//   },
//   {
//     id: 'loteria-nacional-jueves',
//     name: 'Lotería Nacional (jueves)',
//     startsWith: 'Lotería Nacional jueves ',
//     liveName: 'Lotería Nacional',
//     liveEntryMatcher: (entry) =>
//       entry.weekday === 'jueves' &&
//       entry.subtitle === 'Primer premio a la serie',
//     betPrice: 3,
//     minimumTicketPrice: 3,
//     fixedRows: loteriaNacionalJuevesRows,
//   },
//   {
//     id: 'loteria-nacional-sabado',
//     name: 'Lotería Nacional (sábado)',
//     startsWith: 'Lotería Nacional sábado ',
//     liveName: 'Lotería Nacional',
//     liveEntryMatcher: (entry) =>
//       entry.weekday === 'sábado' &&
//       entry.subtitle === 'Primer premio a la serie',
//     betPrice: 6,
//     minimumTicketPrice: 6,
//     fixedRows: loteriaNacionalSabadoRows,
//   },
//   {
//     id: 'primitiva',
//     name: 'La Primitiva',
//     startsWith: 'La Primitiva ',
//     liveName: 'La Primitiva',
//     betPrice: 1,
//     minimumTicketPrice: 1,
//     jackpotCategory: 'special',
//     categories: [
//       {
//         key: 'special',
//         label: 'Especial',
//         aliases: ['Especial (6 Aciertos + R)'],
//         odds: 139838160,
//       },
//       {
//         key: 'first',
//         label: '1ª (6)',
//         aliases: ['1ª (6 Aciertos)'],
//         odds: 13983816,
//       },
//       {
//         key: 'second',
//         label: '2ª (5+C)',
//         aliases: ['2ª (5 Aciertos + C)'],
//         odds: 2330636,
//       },
//       {
//         key: 'third',
//         label: '3ª (5)',
//         aliases: ['3ª (5 Aciertos)'],
//         odds: 55491,
//       },
//       {
//         key: 'fourth',
//         label: '4ª (4)',
//         aliases: ['4ª (4 Aciertos)'],
//         odds: 1032,
//       },
//       { key: 'fifth', label: '5ª (3)', aliases: ['5ª (3 Aciertos)'], odds: 57 },
//       {
//         key: 'refund',
//         label: 'Reintegro',
//         aliases: ['Reintegro |'],
//         odds: 10,
//         exactLineStart: '| Reintegro |',
//       },
//     ],
//   },
//   {
//     id: 'bonoloto',
//     name: 'Bonoloto',
//     startsWith: 'Bonoloto ',
//     liveName: 'Bonoloto',
//     betPrice: 0.5,
//     minimumTicketPrice: 1,
//     jackpotCategory: 'first',
//     categories: [
//       {
//         key: 'first',
//         label: '1ª (6)',
//         aliases: ['1ª (6 Aciertos)'],
//         odds: 13983816,
//       },
//       {
//         key: 'second',
//         label: '2ª (5+C)',
//         aliases: ['2ª (5 Aciertos + C)'],
//         odds: 2330636,
//       },
//       {
//         key: 'third',
//         label: '3ª (5)',
//         aliases: ['3ª (5 Aciertos)'],
//         odds: 55491,
//       },
//       {
//         key: 'fourth',
//         label: '4ª (4)',
//         aliases: ['4ª (4 Aciertos)'],
//         odds: 1032,
//       },
//       { key: 'fifth', label: '5ª (3)', aliases: ['5ª (3 Aciertos)'], odds: 57 },
//       {
//         key: 'refund',
//         label: 'Reintegro',
//         aliases: ['Reintegro |'],
//         odds: 10,
//         exactLineStart: '| Reintegro |',
//       },
//     ],
//   },
//   {
//     id: 'gordo',
//     name: 'El Gordo',
//     startsWith: 'El Gordo ',
//     liveName: 'El gordo',
//     betPrice: 1.5,
//     minimumTicketPrice: 1.5,
//     jackpotCategory: 'first',
//     categories: [
//       {
//         key: 'first',
//         label: '1ª (5+1)',
//         aliases: ['1ª (5 + 1)'],
//         odds: 31625100,
//       },
//       {
//         key: 'second',
//         label: '2ª (5+0)',
//         aliases: ['2ª (5 + 0)'],
//         odds: 3513900,
//       },
//       {
//         key: 'third',
//         label: '3ª (4+1)',
//         aliases: ['3ª (4 + 1)'],
//         odds: 129082,
//       },
//       {
//         key: 'fourth',
//         label: '4ª (4+0)',
//         aliases: ['4ª (4 + 0)'],
//         odds: 14342,
//       },
//       { key: 'fifth', label: '5ª (3+1)', aliases: ['5ª (3 + 1)'], odds: 2689 },
//       { key: 'sixth', label: '6ª (3+0)', aliases: ['6ª (3 + 0)'], odds: 299 },
//       { key: 'seventh', label: '7ª (2+1)', aliases: ['7ª (2 + 1)'], odds: 172 },
//       { key: 'eighth', label: '8ª (2+0)', aliases: ['8ª (2 + 0)'], odds: 19 },
//       {
//         key: 'refund',
//         label: 'Reintegro',
//         aliases: ['Reintegro |'],
//         odds: 10,
//         exactLineStart: '| Reintegro |',
//       },
//     ],
//   },
//   {
//     id: 'eurodreams',
//     name: 'EuroDreams',
//     startsWith: 'EuroDreams ',
//     liveName: 'Eurodreams',
//     betPrice: 2.5,
//     minimumTicketPrice: 2.5,
//     categories: [
//       {
//         key: 'first',
//         label: '1ª (6+1)',
//         aliases: ['1ª 6 + 1'],
//         odds: 19191900,
//         fixedPrize: 7200000,
//       },
//       {
//         key: 'second',
//         label: '2ª (6+0)',
//         aliases: ['2ª 6 + 0'],
//         odds: 4797975,
//         fixedPrize: 120000,
//       },
//       {
//         key: 'third',
//         label: '3ª (5+0/1)',
//         aliases: ['3ª 5 + 0/1'],
//         odds: 18816,
//       },
//       {
//         key: 'fourth',
//         label: '4ª (4+0/1)',
//         aliases: ['4ª 4 + 0/1'],
//         odds: 456,
//       },
//       { key: 'fifth', label: '5ª (3+0/1)', aliases: ['5ª 3 + 0/1'], odds: 32 },
//       { key: 'sixth', label: '6ª (2+0/1)', aliases: ['6ª 2 + 0/1'], odds: 6 },
//     ],
//   },
//   {
//     id: 'lototurf',
//     name: 'Lototurf',
//     startsWith: 'Lototurf -',
//     liveName: 'Lototurf',
//     betPrice: 1,
//     minimumTicketPrice: 1,
//     jackpotCategory: 'first',
//     categories: [
//       {
//         key: 'first',
//         label: '1ª',
//         aliases: ['1ª (6 Números + Caballo Ganador)'],
//         odds: 8835372,
//       },
//       { key: 'second', label: '2ª', aliases: ['2ª (6 Números)'], odds: 803216 },
//       {
//         key: 'third',
//         label: '3ª',
//         aliases: ['3ª (5 Números + Caballo Ganador)'],
//         odds: 58902,
//       },
//       { key: 'fourth', label: '4ª', aliases: ['4ª (5 Números)'], odds: 5355 },
//       {
//         key: 'fifth',
//         label: '5ª',
//         aliases: ['5ª (4 Números + Caballo Ganador)'],
//         odds: 1963,
//       },
//       { key: 'sixth', label: '6ª', aliases: ['6ª (4 Números)'], odds: 178 },
//       {
//         key: 'seventh',
//         label: '7ª',
//         aliases: ['7ª (3 Números + Caballo Ganador)'],
//         odds: 192,
//       },
//       {
//         key: 'refund',
//         label: 'Reintegro',
//         aliases: ['Reintegro |'],
//         odds: 10,
//         exactLineStart: '| Reintegro |',
//       },
//     ],
//   },
//   {
//     id: 'quintuple-plus',
//     name: 'Quíntuple Plus',
//     startsWith: 'Quíntuple Plus -',
//     liveName: 'Quíntuple Plus',
//     betPrice: 1,
//     minimumTicketPrice: 1,
//     jackpotCategory: 'first',
//     categories: [
//       {
//         key: 'first',
//         label: '1ª',
//         aliases: ['1ª (5 Caballos Gan+2º de 5ªCarrera)'],
//         odds: 2737152,
//       },
//       {
//         key: 'second',
//         label: '2ª',
//         aliases: ['2ª (5 Caballos Ganadores)'],
//         odds: 273715,
//       },
//       {
//         key: 'third',
//         label: '3ª',
//         aliases: ['3ª (4 Caballos Gan+2º de 5ªCarrera)'],
//         odds: 49766,
//       },
//       {
//         key: 'fourth',
//         label: '4ª',
//         aliases: ['4ª (4 Caballos Ganadores)'],
//         odds: 4977,
//       },
//     ],
//   },
// ];

// const sectionBoundaries = [
//   'Euromillones ',
//   'Lotería Nacional jueves ',
//   'Lotería Nacional sábado ',
//   'La Primitiva ',
//   'Bonoloto ',
//   'El Gordo ',
//   'EuroDreams ',
//   'La Quiniela',
//   'Quinigol',
//   'Lototurf -',
//   'Quíntuple Plus -',
// ];

// const liveSectionBoundaries = [
//   'Euromillones',
//   'La Primitiva',
//   'Bonoloto',
//   'El gordo',
//   'Lotería Nacional',
//   'La Quiniela',
//   'Lototurf',
//   'Quinigol',
//   'Quíntuple Plus',
//   'Eurodreams',
// ];

// const rankingBody = document.getElementById('ranking');
// const details = document.getElementById('details');
// const statusElement = document.getElementById('status');
// const reloadButton = document.getElementById('reload');
// const closeModalButton = document.getElementById('close-modal');
// const modal = document.getElementById('modal');
// const gameTabs = document.querySelectorAll('[data-game-tab]');
// const betPanels = document.querySelectorAll('[data-bet-panel]');
// const betSummaryGame = document.getElementById('bet-summary-game');
// const betSummaryNumbers = document.getElementById('bet-summary-numbers');
// const betSummaryStars = document.getElementById('bet-summary-stars');
// const betSummaryStarsRow = document.getElementById('bet-summary-stars-row');
// const betSummaryReintegro = document.getElementById('bet-summary-reintegro');
// const betSummaryReintegroRow = document.getElementById(
//   'bet-summary-reintegro-row',
// );
// const betSummaryExtra = document.getElementById('bet-summary-extra');
// const betSummaryExtraRow = document.getElementById('bet-summary-extra-row');
// const betSummaryDraw = document.getElementById('bet-summary-draw');
// const betSummaryTotal = document.getElementById('bet-summary-total');
// const betFeedback = document.getElementById('bet-feedback');
// const betClear = document.getElementById('bet-clear');

// const betState = {
//   activeGame: 'primitiva',
//   primitiva: {
//     draw: 'proximo',
//     numbers: [],
//     reintegro: null,
//     joker: false,
//   },
//   euromillones: {
//     draw: 'proximo',
//     numbers: [],
//     stars: [],
//   },
// };

// reloadButton.addEventListener('click', loadData);

// betClear.addEventListener('click', clearActiveBet);

// gameTabs.forEach((tab) => {
//   tab.addEventListener('click', () => setActiveBetGame(tab.dataset.gameTab));
// });

// loadData();
// setupBettingUI();
// renderBetSummary();

// /**
//  * Carga las dos fuentes oficiales, calcula el ranking y refresca la tabla y el detalle.
//  */
// async function loadData() {
//   statusElement.textContent = 'Cargando datos...';
//   rankingBody.innerHTML = '';
//   details.innerHTML = '';

//   try {
//     const [resultsText, liveGamesText] = await Promise.all([
//       fetchSource(FETCH_URL, 'resultados'),
//       fetchSource(LIVE_FETCH_URL, 'ahora en juego'),
//     ]);
//     const normalized = normalizeText(resultsText);
//     const liveEntries = parseLiveEntries(normalizeText(liveGamesText));
//     const ranking = games
//       .map((game) => parseGame(normalized, liveEntries, game))
//       .filter(Boolean)
//       .map(calculateExpectation)
//       .sort(compareGamesByExpectation);

//     if (!ranking.length) {
//       throw new Error('No he podido extraer sorteos válidos.');
//     }

//     renderRanking(ranking);
//     renderDetails(ranking);
//     statusElement.textContent = `Datos cargados el ${new Date().toLocaleString('es-ES')}.`;
//   } catch (error) {
//     statusElement.textContent = `No se pudieron cargar los datos: ${error.message}`;
//   }
// }

// /**
//  * Descarga una fuente remota y normaliza los errores HTTP para mostrarlos en la UI.
//  */
// async function fetchSource(url, label) {
//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error(`${label}: HTTP ${response.status}`);
//   }

//   return response.text();
// }

// /**
//  * Limpia el markdown devuelto por el proxy para dejar un texto plano más fácil de parsear.
//  */
// function normalizeText(text) {
//   return text
//     .replace(/\r/g, '')
//     .replace(/\[!\[[^\]]*\][^\)]*\)\s*/g, '')
//     .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
//     .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
//     .replace(/\| --- \|.*$/gm, '')
//     .replace(/[ \t]+/g, ' ')
//     .replace(/\n\s+/g, '\n')
//     .replace(/\n{2,}/g, '\n')
//     .trim();
// }

// /**
//  * Extrae de la página de resultados toda la información relevante de un juego concreto.
//  */
// function parseGame(text, liveEntries, game) {
//   const lines = text
//     .split('\n')
//     .map((line) => line.trim())
//     .filter(Boolean);
//   const startIndex = lines.findIndex((line) =>
//     line.startsWith(game.startsWith),
//   );

//   if (startIndex === -1) {
//     return null;
//   }

//   let endIndex = lines.length;

//   for (let index = startIndex + 1; index < lines.length; index += 1) {
//     if (
//       sectionBoundaries.some((boundary) => lines[index].startsWith(boundary))
//     ) {
//       endIndex = index;
//       break;
//     }
//   }

//   const sectionLines = lines.slice(startIndex, endIndex);
//   const sectionText = sectionLines.join('\n');
//   const liveEntry = findLiveEntry(liveEntries, game);
//   const resultDate = extractDate(sectionLines[0]);
//   const resultAdvertisedJackpot = extractMetric(
//     sectionText,
//     /Bote publicitado: ?([\d\.\,]+)\s*€/,
//   );
//   const categories = (game.categories || []).map((category) => {
//     const line = findCategoryLine(sectionLines, category);
//     return {
//       ...category,
//       line,
//       prize: line ? extractPrizeFromLine(line) : null,
//       winners: line ? extractWinnersFromLine(line) : null,
//     };
//   });
//   const jackpotCategoryRow =
//     categories.find((category) => category.key === game.jackpotCategory) ||
//     null;
//   const canReuseResultJackpot =
//     Boolean(resultAdvertisedJackpot) &&
//     jackpotCategoryRow &&
//     jackpotCategoryRow.winners === 0;
//   const currentAdvertisedJackpot =
//     liveEntry?.advertisedJackpot ??
//     (canReuseResultJackpot ? resultAdvertisedJackpot : null);
//   const currentJackpotSource = liveEntry?.advertisedJackpot
//     ? 'bote-vigente'
//     : canReuseResultJackpot
//       ? 'bote-acumulado'
//       : null;

//   return {
//     id: game.id,
//     name: game.name,
//     drawDate: liveEntry?.drawDate || resultDate,
//     resultDate,
//     betPrice: game.betPrice,
//     minimumTicketPrice: game.minimumTicketPrice,
//     advertisedJackpot: currentAdvertisedJackpot,
//     advertisedJackpotSource: currentJackpotSource,
//     liveAdvertisedJackpot: liveEntry?.advertisedJackpot ?? null,
//     resultAdvertisedJackpot,
//     betsReceived: extractMetric(
//       sectionText,
//       /Apuestas recibidas: ?([\d\.\,]+)/,
//     ),
//     fixedRows: game.fixedRows || [],
//     categories,
//     extraPrizes: (game.extraPrizes || []).map((extraPrize) => ({
//       label: extraPrize.label,
//       odds: extraPrize.oddsFromBets
//         ? extractMetric(sectionText, /Apuestas recibidas: ?([\d\.\,]+)/)
//         : extraPrize.odds,
//       prize: extraPrize.prize,
//     })),
//     jackpotCategory: game.jackpotCategory || null,
//     liveSubtitle: liveEntry?.subtitle || null,
//   };
// }

// /**
//  * Parte la página de "Ahora en juego" en bloques independientes, uno por sorteo.
//  */
// function parseLiveEntries(text) {
//   const lines = text
//     .split('\n')
//     .map((line) => line.trim())
//     .filter(Boolean);
//   const entries = [];

//   for (let index = 0; index < lines.length; index += 1) {
//     if (!liveSectionBoundaries.includes(lines[index])) {
//       continue;
//     }

//     let endIndex = lines.length;

//     for (let nextIndex = index + 1; nextIndex < lines.length; nextIndex += 1) {
//       if (liveSectionBoundaries.includes(lines[nextIndex])) {
//         endIndex = nextIndex;
//         break;
//       }
//     }

//     entries.push(buildLiveEntry(lines.slice(index, endIndex)));
//     index = endIndex - 1;
//   }

//   return entries;
// }

// /**
//  * Convierte un bloque de "Ahora en juego" en una entrada con fecha, subtítulo y premio anunciado.
//  */
// function buildLiveEntry(lines) {
//   const name = lines[0];
//   const body = lines.slice(1);
//   const dateIndex = body.findIndex(isLiveDateLine);
//   const beforeDate = dateIndex === -1 ? body : body.slice(0, dateIndex);
//   const afterDate = dateIndex === -1 ? [] : body.slice(dateIndex + 1);
//   const subtitle =
//     afterDate.find(
//       (line) =>
//         !isCountdownLine(line) && line !== 'Jugar' && !line.startsWith('*'),
//     ) || null;
//   const dateLine = dateIndex === -1 ? null : body[dateIndex];

//   return {
//     name,
//     drawDate: dateLine ? formatSpanishDate(dateLine) : null,
//     weekday: dateLine ? extractSpanishWeekday(dateLine) : null,
//     subtitle,
//     advertisedJackpot: extractLivePrize(beforeDate),
//   };
// }

// /**
//  * Busca la entrada en vivo que corresponde al juego actual, aplicando filtros cuando hace falta.
//  */
// function findLiveEntry(entries, game) {
//   const matchingEntries = entries.filter(
//     (entry) => entry.name === game.liveName,
//   );

//   if (!matchingEntries.length) {
//     return null;
//   }

//   if (typeof game.liveEntryMatcher === 'function') {
//     return (
//       matchingEntries.find((entry) => game.liveEntryMatcher(entry)) || null
//     );
//   }

//   return matchingEntries[0];
// }

// /**
//  * Localiza la línea exacta de una categoría dentro del bloque de resultados del juego.
//  */
// function findCategoryLine(lines, category) {
//   if (category.exactLineStart) {
//     return (
//       lines.find((line) => line.startsWith(category.exactLineStart)) || null
//     );
//   }

//   return (
//     lines.find((line) =>
//       category.aliases.some((alias) => line.includes(alias)),
//     ) || null
//   );
// }

// /**
//  * Calcula el retorno esperado y la esperanza neta a partir de premios, probabilidades y apuesta mínima.
//  */
// function calculateExpectation(game) {
//   if (game.fixedRows.length > 0) {
//     const rows = game.fixedRows.map((row) => ({
//       label: row.label,
//       prize: row.prize,
//       odds: row.odds,
//       expected: row.prize / row.odds,
//     }));

//     const expectedPayout = rows.reduce((total, row) => total + row.expected, 0);

//     return {
//       ...game,
//       rows,
//       topPrize: rows.length ? Math.max(...rows.map((row) => row.prize)) : 0,
//       expectationStatus: 'exacta',
//       expectedPayout,
//       expectedNet: expectedPayout - game.minimumTicketPrice,
//     };
//   }

//   const multiplier = game.minimumTicketPrice / game.betPrice;
//   const rows = [];
//   let missingCurrentTopPrize = false;

//   for (const category of game.categories) {
//     if (!category.odds) {
//       continue;
//     }

//     let effectivePrize = category.prize;
//     let prizeSource = category.prize ? 'ultimo-resultado' : 'sin-dato';
//     const isJackpotCategory = game.jackpotCategory === category.key;

//     if (isJackpotCategory) {
//       if (game.advertisedJackpot) {
//         effectivePrize = game.advertisedJackpot;
//         prizeSource = game.advertisedJackpotSource || 'bote-vigente';
//       } else {
//         effectivePrize = null;
//         prizeSource = 'vigente-no-publicado';
//         missingCurrentTopPrize = true;
//       }
//     }

//     if ((!effectivePrize || effectivePrize === 0) && category.fixedPrize) {
//       effectivePrize = category.fixedPrize;
//       prizeSource = 'premio-fijo';
//     }

//     rows.push({
//       label: category.label,
//       prize: effectivePrize,
//       odds: category.odds,
//       expected:
//         effectivePrize == null
//           ? null
//           : (effectivePrize / category.odds) * multiplier,
//       source: prizeSource,
//     });
//   }

//   for (const extraPrize of game.extraPrizes) {
//     if (!extraPrize.odds || !extraPrize.prize) {
//       continue;
//     }

//     rows.push({
//       label: extraPrize.label,
//       prize: extraPrize.prize,
//       odds: extraPrize.odds,
//       expected: (extraPrize.prize / extraPrize.odds) * multiplier,
//       source: 'premio-fijo',
//     });
//   }

//   const knownExpectedPayout = rows.reduce(
//     (total, row) => total + (row.expected || 0),
//     0,
//   );
//   const expectedPayout = missingCurrentTopPrize ? null : knownExpectedPayout;

//   return {
//     ...game,
//     rows,
//     topPrize: missingCurrentTopPrize
//       ? null
//       : rows.length
//         ? Math.max(...rows.map((row) => row.prize || 0))
//         : null,
//     expectationStatus: missingCurrentTopPrize
//       ? 'pendiente-premio-maximo'
//       : 'exacta',
//     knownExpectedPayout,
//     expectedPayout,
//     expectedNet:
//       expectedPayout == null ? null : expectedPayout - game.minimumTicketPrice,
//   };
// }

// /**
//  * Renderiza la tabla-resumen ordenada por esperanza matemática.
//  */
// function renderRanking(ranking) {
//   rankingBody.innerHTML = ranking
//     .map(
//       (game, index) => `
//     <tr>
//       <td>${index + 1}</td>
//       <td>${game.name}</td>
//       <td class="date-cell">${game.drawDate || '-'}</td>
//       <td class="money-cell ${game.topPrize == null ? 'na' : ''}">${formatMoneyValue(game.topPrize, 'N/D')}</td>
//       <td class="money-cell">${formatMoney(game.minimumTicketPrice)}</td>
//       <td class="money-cell ${game.expectedPayout == null ? 'na' : ''}">${formatMoneyValue(game.expectedPayout, 'N/D')}</td>
//       <td class="money-cell ${getNetClassName(game.expectedNet)}">${formatMoneyValue(game.expectedNet, 'N/D')}</td>
//     </tr>
//   `,
//     )
//     .join('');
// }

// /**
//  * Renderiza el bloque de detalle de cada sorteo con sus categorías en formato tarjeta.
//  */
// function renderDetails(ranking) {
//   details.innerHTML = ranking
//     .map(
//       (game) => `
//     <article class="detail-card">
//       <h2>${game.name}</h2>
//       <p class="detail-meta">${buildDetailMeta(game)}</p>
//       <div class="detail-grid">
//         ${game.rows
//           .map(
//             (row) => `
//           <article class="detail-item">
//             <h3>${row.label}</h3>
//             <p><strong>Premio usado:</strong> ${formatMoneyValue(row.prize, 'N/D')}</p>
//             <p><strong>Probabilidad:</strong> 1 entre ${formatNumber(row.odds)}</p>
//             <p><strong>Valor esperado:</strong> ${formatMoneyValue(row.expected, 'N/D')}</p>
//             <p class="detail-item-source">${describePrizeSource(row.source)}</p>
//           </article>
//         `,
//           )
//           .join('')}
//       </div>
//     </article>
//   `,
//     )
//     .join('');
// }

// /**
//  * Extrae una fecha en formato dd/mm/aaaa desde una línea de texto.
//  */
// function extractDate(line) {
//   const match = line.match(/(\d{2}\/\d{2}\/\d{4})/);
//   return match ? match[1] : null;
// }

// /**
//  * Aplica una expresión regular a un bloque y convierte el valor monetario o numérico encontrado.
//  */
// function extractMetric(text, regex) {
//   const match = text.match(regex);
//   return match ? parseEuro(match[1]) : null;
// }

// /**
//  * Obtiene el número de acertantes de una fila de premios en formato tabla markdown.
//  */
// function extractWinnersFromLine(line) {
//   const match = line.match(/^\|[^|]+\|\s*([\d\.]+)\s*\|/);
//   return match ? Number.parseInt(match[1].replace(/\./g, ''), 10) : null;
// }

// /**
//  * Devuelve el último importe en euros encontrado en una línea de categoría.
//  */
// function extractPrizeFromLine(line) {
//   const matches = [...line.matchAll(/([\d\.\,]+)\s*€/g)];
//   return matches.length ? parseEuro(matches[matches.length - 1][1]) : null;
// }

// /**
//  * Convierte importes con formato español a número decimal de JavaScript.
//  */
// function parseEuro(value) {
//   return Number.parseFloat(
//     String(value).replace(/[€\s]/g, '').replace(/\./g, '').replace(',', '.'),
//   );
// }

// /**
//  * Lee el premio anunciado en la página de "Ahora en juego", ya sea en euros o en millones.
//  */
// function extractLivePrize(lines) {
//   for (let index = 0; index < lines.length; index += 1) {
//     const line = lines[index];

//     if (/€/.test(line)) {
//       return parseEuro(line);
//     }

//     if (index < lines.length - 1 && /^millones$/i.test(lines[index + 1])) {
//       return parseEuro(line) * 1000000;
//     }
//   }

//   return null;
// }

// /**
//  * Detecta si una línea corresponde a la fecha/hora de un sorteo en la página de juegos en curso.
//  */
// function isLiveDateLine(line) {
//   return /^(lunes|martes|miércoles|jueves|viernes|sábado|domingo),\s*\d{1,2}\s+de\s+[a-záéíóú]+\s+de\s+\d{4}-\d{1,2}:\d{2}h$/i.test(
//     line,
//   );
// }

// /**
//  * Identifica las líneas de cuenta atrás para no confundirlas con metadatos útiles.
//  */
// function isCountdownLine(line) {
//   return (
//     /^\d+d(?: \d+h)?$/i.test(line) ||
//     /^\d+h(?: \d+min)?$/i.test(line) ||
//     /^\d+min$/i.test(line)
//   );
// }

// /**
//  * Extrae el nombre del día de la semana desde una línea de fecha en castellano.
//  */
// function extractSpanishWeekday(line) {
//   const match = line.match(
//     /^(lunes|martes|miércoles|jueves|viernes|sábado|domingo)/i,
//   );
//   return match ? match[1].toLowerCase() : null;
// }

// /**
//  * Convierte una fecha textual en castellano al formato corto dd/mm/aaaa.
//  */
// function formatSpanishDate(line) {
//   const match = line.match(/(\d{1,2})\s+de\s+([a-záéíóú]+)\s+de\s+(\d{4})/i);

//   if (!match) {
//     return null;
//   }

//   const day = String(Number.parseInt(match[1], 10)).padStart(2, '0');
//   const month = getSpanishMonthNumber(match[2]);

//   if (!month) {
//     return null;
//   }

//   return `${day}/${month}/${match[3]}`;
// }

// /**
//  * Mapea nombres de meses en castellano a su número de dos dígitos.
//  */
// function getSpanishMonthNumber(monthName) {
//   const months = {
//     enero: '01',
//     febrero: '02',
//     marzo: '03',
//     abril: '04',
//     mayo: '05',
//     junio: '06',
//     julio: '07',
//     agosto: '08',
//     septiembre: '09',
//     setiembre: '09',
//     octubre: '10',
//     noviembre: '11',
//     diciembre: '12',
//   };

//   return months[monthName.toLowerCase()] || null;
// }

// /**
//  * Traduce claves internas de procedencia del premio a textos legibles para el usuario.
//  */
// function describePrizeSource(source) {
//   const labels = {
//     'ultimo-resultado': 'último resultado publicado',
//     'bote-vigente': 'sorteo en juego',
//     'bote-acumulado': 'último bote acumulado sin acertantes',
//     'premio-fijo': 'importe fijo',
//     'premio-resuelto': 'no reutilizado: ya adjudicado',
//     'vigente-no-publicado':
//       'La Sociedad Estatal de Loterías y Apuestas del Estado (SELAE) no publica el premio máximo vigente y el último ya resuelto no se reutiliza',
//     'sin-bote-vigente': 'sin bote vigente publicado',
//     'sin-dato': 'sin dato oficial suficiente',
//   };

//   return labels[source] || 'dato disponible';
// }

// /**
//  * Construye la línea de metadatos de cada sorteo con el contexto de cálculo usado.
//  */
// function buildDetailMeta(game) {
//   const meta = [`Próximo sorteo: ${game.drawDate || '-'}`];

//   if (game.resultDate) {
//     meta.push(`Último resultado consultado: ${game.resultDate}`);
//   }

//   if (game.fixedRows.length > 0) {
//     meta.push(`Máxima categoría usada: ${formatMoney(game.topPrize)}`);
//     return meta.join(' | ');
//   }

//   if (game.advertisedJackpot) {
//     meta.push(
//       `Premio máximo vigente usado: ${formatMoney(game.advertisedJackpot)}`,
//     );
//   } else {
//     meta.push(
//       'Premio máximo vigente: no publicado por la Sociedad Estatal de Loterías y Apuestas del Estado (SELAE) para el sorteo en juego',
//     );
//   }

//   if (game.expectationStatus !== 'exacta') {
//     meta.push(
//       'Esperanza matemática exacta: no disponible hasta que la Sociedad Estatal de Loterías y Apuestas del Estado (SELAE) publique la categoría máxima vigente',
//     );
//   }

//   return meta.join(' | ');
// }

// /**
//  * Formatea un importe en euros según configuración regional española.
//  */
// function formatMoney(value) {
//   return new Intl.NumberFormat('es-ES', {
//     style: 'currency',
//     currency: 'EUR',
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// /**
//  * Formatea un importe o devuelve un texto alternativo cuando el dato no existe.
//  */
// function formatMoneyValue(value, fallback = '-') {
//   return value == null ? fallback : formatMoney(value);
// }

// /**
//  * Formatea probabilidades y contadores con separador de miles.
//  */
// function formatNumber(value) {
//   return new Intl.NumberFormat('es-ES').format(Math.round(value || 0));
// }

// /**
//  * Ordena los juegos por esperanza neta y deja al final los que no tienen dato completo.
//  */
// function compareGamesByExpectation(left, right) {
//   const leftValue =
//     left.expectedNet == null ? Number.NEGATIVE_INFINITY : left.expectedNet;
//   const rightValue =
//     right.expectedNet == null ? Number.NEGATIVE_INFINITY : right.expectedNet;

//   if (rightValue !== leftValue) {
//     return rightValue - leftValue;
//   }

//   return left.name.localeCompare(right.name, 'es');
// }

// /**
//  * Devuelve la clase visual adecuada para la esperanza neta según su signo o disponibilidad.
//  */
// function getNetClassName(value) {
//   if (value == null) {
//     return 'na';
//   }

//   return value >= 0 ? 'positive' : 'negative';
// }

// /**
//  * Inicializa toda la interfaz de apuestas y conecta sus eventos principales.
//  */
// function setupBettingUI() {
//   buildBallGrid('primitiva-grid', 49, 'primitiva-number', {
//     startAt: 1,
//     groupSize: 10,
//   });
//   buildBallGrid('primitiva-reintegro-grid', 10, 'primitiva-reintegro', {
//     startAt: 0,
//     compact: true,
//   });
//   buildBallGrid('euromillones-grid', 50, 'euromillones-number', {
//     startAt: 1,
//     groupSize: 10,
//   });
//   buildBallGrid('euromillones-stars-grid', 12, 'euromillones-star', {
//     startAt: 1,
//     groupSize: 6,
//     isStar: true,
//   });

//   document.getElementById('primitiva-random').addEventListener('click', () => {
//     betState.primitiva.numbers = pickRandomUnique(6, 1, 49).sort(
//       (a, b) => a - b,
//     );
//     refreshBetButtons();
//     renderBetSummary();
//   });

//   document
//     .getElementById('primitiva-reintegro-random')
//     .addEventListener('click', () => {
//       betState.primitiva.reintegro = randomBetween(0, 9);
//       refreshBetButtons();
//       renderBetSummary();
//     });

//   document
//     .getElementById('euromillones-random')
//     .addEventListener('click', () => {
//       betState.euromillones.numbers = pickRandomUnique(5, 1, 50).sort(
//         (a, b) => a - b,
//       );
//       refreshBetButtons();
//       renderBetSummary();
//     });

//   document
//     .getElementById('euromillones-stars-random')
//     .addEventListener('click', () => {
//       betState.euromillones.stars = pickRandomUnique(2, 1, 12).sort(
//         (a, b) => a - b,
//       );
//       refreshBetButtons();
//       renderBetSummary();
//     });

//   document
//     .getElementById('primitiva-joker')
//     .addEventListener('change', (event) => {
//       betState.primitiva.joker = event.target.checked;
//       renderBetSummary();
//     });

//   document.querySelectorAll('[data-primitiva-draw]').forEach((button) => {
//     button.addEventListener('click', () => {
//       document
//         .querySelectorAll('[data-primitiva-draw]')
//         .forEach((item) => item.classList.remove('active'));
//       button.classList.add('active');
//       betState.primitiva.draw = button.dataset.primitivaDraw;
//       renderBetSummary();
//     });
//   });

//   document.querySelectorAll('[data-euromillones-draw]').forEach((button) => {
//     button.addEventListener('click', () => {
//       document
//         .querySelectorAll('[data-euromillones-draw]')
//         .forEach((item) => item.classList.remove('active'));
//       button.classList.add('active');
//       betState.euromillones.draw = button.dataset.euromillonesDraw;
//       renderBetSummary();
//     });
//   });
// }

// /**
//  * Genera dinámicamente la rejilla de bolas de un panel de apuestas.
//  */
// function buildBallGrid(containerId, count, type, options = {}) {
//   const startAt = options.startAt ?? 1;
//   const groupSize = options.groupSize ?? count;
//   const isStar = options.isStar ?? false;
//   const compact = options.compact ?? false;
//   const container = document.getElementById(containerId);
//   const groups = [];

//   if (compact) {
//     const items = [];

//     for (let value = startAt; value < startAt + count; value += 1) {
//       items.push(createBallMarkup(type, value, isStar));
//     }

//     container.innerHTML = items.join('');
//   } else {
//     for (let value = startAt; value < startAt + count; value += groupSize) {
//       const values = [];
//       const maxValue = Math.min(value + groupSize - 1, startAt + count - 1);

//       for (let current = value; current <= maxValue; current += 1) {
//         values.push(createBallMarkup(type, current, isStar));
//       }

//       groups.push(`
//         <div class="ball-row">
//           <div class="ball-row-label">${String(value).padStart(2, '0')}-${String(maxValue).padStart(2, '0')}</div>
//           <div class="ball-row-items" style="--row-count:${groupSize}">${values.join('')}</div>
//         </div>
//       `);
//     }

//     container.innerHTML = groups.join('');
//   }

//   container.querySelectorAll('[data-ball-type]').forEach((button) => {
//     button.addEventListener('click', () => {
//       toggleBall(type, Number(button.dataset.ballValue));
//     });
//   });
// }

// /**
//  * Devuelve el HTML de una bola o estrella seleccionable.
//  */
// function createBallMarkup(type, value, isStar) {
//   return `
//     <button
//       type="button"
//       class="ball${isStar ? ' star-ball' : ''}"
//       data-ball-type="${type}"
//       data-ball-value="${value}"
//     >
//       ${
//         isStar
//           ? `
//         <svg class="star-shape" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
//           <polygon points="50,1 61,35 98,35 68,57 79,95 50,73 21,95 32,57 2,35 39,35"></polygon>
//         </svg>
//       `
//           : ''
//       }
//       <span class="ball-text">${String(value).padStart(2, '0')}</span>
//     </button>
//   `;
// }

// /**
//  * Aplica una pulsación de usuario sobre una bola y actualiza el estado del juego correspondiente.
//  */
// function toggleBall(type, value) {
//   if (type === 'primitiva-number') {
//     toggleSelection(betState.primitiva.numbers, value, 6);
//   }

//   if (type === 'primitiva-reintegro') {
//     betState.primitiva.reintegro =
//       betState.primitiva.reintegro === value ? null : value;
//   }

//   if (type === 'euromillones-number') {
//     toggleSelection(betState.euromillones.numbers, value, 5);
//   }

//   if (type === 'euromillones-star') {
//     toggleSelection(betState.euromillones.stars, value, 2);
//   }

//   refreshBetButtons();
//   renderBetSummary();
// }

// /**
//  * Añade o quita un valor de una selección limitada y la mantiene ordenada.
//  */
// function toggleSelection(list, value, maxItems) {
//   const index = list.indexOf(value);

//   if (index >= 0) {
//     list.splice(index, 1);
//     return;
//   }

//   if (list.length >= maxItems) {
//     return;
//   }

//   list.push(value);
//   list.sort((a, b) => a - b);
// }

// /**
//  * Sincroniza el estado visual de todas las bolas activas con el estado interno de apuesta.
//  */
// function refreshBetButtons() {
//   document.querySelectorAll('[data-ball-type]').forEach((button) => {
//     const type = button.dataset.ballType;
//     const value = Number(button.dataset.ballValue);
//     let active = false;

//     if (type === 'primitiva-number') {
//       active = betState.primitiva.numbers.includes(value);
//     }

//     if (type === 'primitiva-reintegro') {
//       active = betState.primitiva.reintegro === value;
//     }

//     if (type === 'euromillones-number') {
//       active = betState.euromillones.numbers.includes(value);
//     }

//     if (type === 'euromillones-star') {
//       active = betState.euromillones.stars.includes(value);
//     }

//     button.classList.toggle('active', active);
//   });
// }

// /**
//  * Cambia de juego activo en el apartado de apuestas y refresca el resumen lateral.
//  */
// function setActiveBetGame(gameId) {
//   betState.activeGame = gameId;
//   gameTabs.forEach((tab) =>
//     tab.classList.toggle('active', tab.dataset.gameTab === gameId),
//   );
//   betPanels.forEach((panel) =>
//     panel.classList.toggle('active', panel.dataset.betPanel === gameId),
//   );
//   renderBetSummary();
// }

// /**
//  * Renderiza el resumen de la apuesta activa con importes, extras y selección actual.
//  */
// function renderBetSummary() {
//   const gameId = betState.activeGame;

//   if (gameId === 'primitiva') {
//     const total = 1 + (betState.primitiva.joker ? 1 : 0);
//     betSummaryGame.textContent = 'La Primitiva';
//     betSummaryNumbers.textContent = formatBallList(betState.primitiva.numbers);
//     betSummaryStarsRow.classList.add('hidden-row');
//     betSummaryReintegroRow.classList.remove('hidden-row');
//     betSummaryExtraRow.classList.remove('hidden-row');
//     betSummaryReintegro.textContent =
//       betState.primitiva.reintegro === null
//         ? '-'
//         : String(betState.primitiva.reintegro);
//     betSummaryExtra.textContent = betState.primitiva.joker
//       ? 'Con Joker'
//       : 'Sin Joker';
//     betSummaryDraw.textContent =
//       betState.primitiva.draw === 'semanal' ? 'Semanal' : 'Próximo sorteo';
//     betSummaryTotal.textContent = formatMoney(total);
//   }

//   if (gameId === 'euromillones') {
//     const total = betState.euromillones.draw === 'semana' ? 5 : 2.5;
//     betSummaryGame.textContent = 'Euromillones';
//     betSummaryNumbers.textContent = formatBallList(
//       betState.euromillones.numbers,
//     );
//     betSummaryStarsRow.classList.remove('hidden-row');
//     betSummaryReintegroRow.classList.add('hidden-row');
//     betSummaryExtraRow.classList.add('hidden-row');
//     betSummaryStars.textContent = formatBallList(betState.euromillones.stars);
//     betSummaryDraw.textContent =
//       betState.euromillones.draw === 'semana'
//         ? 'Dos sorteos de la semana'
//         : 'Próximo sorteo';
//     betSummaryTotal.textContent = formatMoney(total);
//   }

//   betFeedback.textContent = '';
// }

// /**
//  * Resetea por completo la apuesta activa y devuelve sus controles al estado inicial.
//  */
// function clearActiveBet() {
//   if (betState.activeGame === 'primitiva') {
//     betState.primitiva = {
//       draw: 'proximo',
//       numbers: [],
//       reintegro: null,
//       joker: false,
//     };

//     document.querySelectorAll('[data-primitiva-draw]').forEach((button) => {
//       button.classList.toggle(
//         'active',
//         button.dataset.primitivaDraw === 'proximo',
//       );
//     });
//     document.getElementById('primitiva-joker').checked = false;
//   }

//   if (betState.activeGame === 'euromillones') {
//     betState.euromillones = {
//       draw: 'proximo',
//       numbers: [],
//       stars: [],
//     };

//     document.querySelectorAll('[data-euromillones-draw]').forEach((button) => {
//       button.classList.toggle(
//         'active',
//         button.dataset.euromillonesDraw === 'proximo',
//       );
//     });
//   }

//   refreshBetButtons();
//   renderBetSummary();
//   betFeedback.textContent = 'Apuesta limpiada.';
// }

// /**
//  * Convierte una lista de números en el formato corto mostrado en el resumen.
//  */
// function formatBallList(values) {
//   if (!values.length) {
//     return '-';
//   }

//   return values.map((value) => String(value).padStart(2, '0')).join(' · ');
// }

// /**
//  * Genera una lista de números aleatorios no repetidos dentro de un rango.
//  */
// function pickRandomUnique(count, min, max) {
//   const values = new Set();

//   while (values.size < count) {
//     values.add(randomBetween(min, max));
//   }

//   return [...values];
// }

// /**
//  * Devuelve un entero aleatorio dentro de un rango inclusivo.
//  */
// function randomBetween(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function App() {
  return (
    <>
      <main className="wrap">
        <Header />
        <section className="panel">
          <p id="status">Cargando datos...</p>
          <p className="source">
            Fuente oficial de la Sociedad Estatal de Loterías y Apuestas del
            Estado (SELAE):
            <a
              href="https://www.loteriasyapuestas.es/es/resultados"
              target="_blank"
              rel="noreferrer"
            >
              Resultados SELAE
            </a>
          </p>
        </section>

        <section className="panel">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Sorteo</th>
                  <th className="date-col">Fecha</th>
                  <th className="money-col">Premio máxima categoría</th>
                  <th className="money-col">Apuesta mínima</th>
                  <th className="money-col">Retorno esperado</th>
                  <th className="money-col">Esperanza neta</th>
                </tr>
              </thead>
              <tbody id="ranking"></tbody>
            </table>
          </div>
        </section>

        <section className="panel betting-panel">
          <div className="betting-head">
            <div>
              <h2>Preparar apuesta</h2>
              <p className="betting-copy">
                Apartado visual para montar apuestas de La Primitiva y
                Euromillones inspirado en la estructura del portal oficial.
              </p>
            </div>
          </div>

          <div
            className="bet-tabs"
            role="tablist"
            aria-label="Selector de juego"
          >
            <button
              id="tab-primitiva"
              className="bet-tab active"
              type="button"
              data-game-tab="primitiva"
            >
              La Primitiva
            </button>
            <button
              id="tab-euromillones"
              className="bet-tab"
              type="button"
              data-game-tab="euromillones"
            >
              Euromillones
            </button>
          </div>

          <div className="bet-layout">
            <div className="bet-main">
              <section className="bet-card active" data-bet-panel="primitiva">
                <div className="bet-card-head">
                  <h3>La Primitiva</h3>
                  <span className="bet-price">1,00 € por apuesta</span>
                </div>
                <div className="choice-block">
                  <p className="choice-title">Sorteo</p>
                  <div className="pill-group">
                    <button
                      className="pill active"
                      type="button"
                      data-primitiva-draw="proximo"
                    >
                      Próximo sorteo
                    </button>
                    <button
                      className="pill"
                      type="button"
                      data-primitiva-draw="semanal"
                    >
                      Semanal
                    </button>
                  </div>
                </div>
                <div className="choice-block">
                  <div className="choice-row">
                    <p className="choice-title">Selecciona 6 números</p>
                    <button
                      className="link-action"
                      id="primitiva-random"
                      type="button"
                    >
                      Combinación automática
                    </button>
                  </div>
                  <div id="primitiva-grid" className="number-grid"></div>
                </div>
                <div className="choice-block">
                  <div className="choice-row">
                    <p className="choice-title">Reintegro</p>
                    <button
                      className="link-action"
                      id="primitiva-reintegro-random"
                      type="button"
                    >
                      Aleatorio
                    </button>
                  </div>
                  <div
                    id="primitiva-reintegro-grid"
                    className="tiny-grid"
                  ></div>
                </div>
                <div className="choice-block toggle-line">
                  <label className="switch-row">
                    <input id="primitiva-joker" type="checkbox" />
                    <span>Jugar también a El Joker (+1,00 €)</span>
                  </label>
                </div>
              </section>

              <section className="bet-card" data-bet-panel="euromillones">
                <div className="bet-card-head">
                  <h3>Euromillones</h3>
                  <span className="bet-price">2,50 € por apuesta</span>
                </div>
                <div className="choice-block">
                  <p className="choice-title">Sorteo</p>
                  <div className="pill-group">
                    <button
                      className="pill active"
                      type="button"
                      data-euromillones-draw="proximo"
                    >
                      Próximo sorteo
                    </button>
                    <button
                      className="pill"
                      type="button"
                      data-euromillones-draw="semana"
                    >
                      Dos sorteos de la semana
                    </button>
                  </div>
                </div>
                <div className="choice-block">
                  <div className="choice-row">
                    <p className="choice-title">Selecciona 5 números</p>
                    <button
                      className="link-action"
                      id="euromillones-random"
                      type="button"
                    >
                      Combinación automática
                    </button>
                  </div>
                  <div id="euromillones-grid" className="number-grid"></div>
                </div>
                <div className="choice-block">
                  <div className="choice-row">
                    <p className="choice-title">Selecciona 2 estrellas</p>
                    <button
                      className="link-action"
                      id="euromillones-stars-random"
                      type="button"
                    >
                      Aleatorias
                    </button>
                  </div>
                  <div id="euromillones-stars-grid" className="star-grid"></div>
                </div>
              </section>
            </div>

            <aside className="bet-sidebar">
              <div className="summary-card">
                <h3>Resumen de la apuesta</h3>
                <p className="summary-game" id="bet-summary-game">
                  La Primitiva
                </p>
                <dl className="summary-list">
                  <div>
                    <dt>Números</dt>
                    <dd id="bet-summary-numbers">-</dd>
                  </div>
                  <div id="bet-summary-stars-row" className="hidden-row">
                    <dt>Estrellas</dt>
                    <dd id="bet-summary-stars">-</dd>
                  </div>
                  <div id="bet-summary-reintegro-row">
                    <dt>Reintegro</dt>
                    <dd id="bet-summary-reintegro">-</dd>
                  </div>
                  <div id="bet-summary-extra-row">
                    <dt>Extra</dt>
                    <dd id="bet-summary-extra">Sin Joker</dd>
                  </div>
                  <div>
                    <dt>Sorteo</dt>
                    <dd id="bet-summary-draw">Próximo sorteo</dd>
                  </div>
                  <div>
                    <dt>Total</dt>
                    <dd id="bet-summary-total">0,00 €</dd>
                  </div>
                </dl>
                <div className="summary-actions">
                  <button id="bet-clear" className="secondary" type="button">
                    Limpiar
                  </button>
                </div>
                <p id="bet-feedback" className="bet-feedback"></p>
              </div>
            </aside>
          </div>
        </section>

        <section id="details" className="details"></section>

        <footer className="site-footer">
          <p>
            <span className="footer-version">v0.4</span>
            <span className="footer-separator" aria-hidden="true">
              ·
            </span>
            <a
              href="https://github.com/rafasanz"
              target="_blank"
              rel="noreferrer"
            >
              @rafasanz
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}

export default App;
