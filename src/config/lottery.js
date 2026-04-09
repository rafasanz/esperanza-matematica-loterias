export const SOURCE_URL = "https://www.loteriasyapuestas.es/es/resultados";
export const FETCH_URL = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(`https://r.jina.ai/http://${SOURCE_URL}`)}`;
export const LIVE_SOURCE_URL = "https://www.loteriasyapuestas.es/es/juegos-disponibles-online";
export const LIVE_FETCH_URL = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(`https://r.jina.ai/http://${LIVE_SOURCE_URL}`)}`;

const loteriaNacionalJuevesRows = [
  { label: "1er premio", prize: 30000, odds: 100000 },
  { label: "2º premio", prize: 6000, odds: 100000 },
  { label: "4 cifras", prize: 75, odds: 2500 },
  { label: "3 cifras", prize: 15, odds: 100000 / 700 },
  { label: "2 cifras", prize: 6, odds: 100000 / 9000 },
  { label: "Aprox. 1er premio", prize: 1200, odds: 50000 },
  { label: "Aprox. 2º premio", prize: 747, odds: 50000 },
  { label: "Centena 1er premio", prize: 30, odds: 100000 / 99 },
  { label: "Centena 2º premio", prize: 15, odds: 100000 / 99 },
  { label: "Últimas 4 del 1er premio", prize: 75, odds: 100000 / 9 },
  { label: "Últimas 3 del 1er premio", prize: 15, odds: 100000 / 99 },
  { label: "Últimas 2 del 1er premio", prize: 6, odds: 100000 / 999 },
  { label: "Reintegro 1er premio", prize: 3, odds: 100000 / 9999 },
  { label: "1ª extracción especial", prize: 3, odds: 10 },
  { label: "2ª extracción especial", prize: 3, odds: 10 }
];

const loteriaNacionalSabadoRows = [
  { label: "1er premio", prize: 60000, odds: 100000 },
  { label: "2º premio", prize: 12000, odds: 100000 },
  { label: "4 cifras", prize: 150, odds: 2500 },
  { label: "3 cifras", prize: 30, odds: 100 },
  { label: "2 cifras", prize: 12, odds: 100000 / 9000 },
  { label: "Aprox. 1er premio", prize: 1000, odds: 50000 },
  { label: "Aprox. 2º premio", prize: 554, odds: 50000 },
  { label: "Centena 1er premio", prize: 30, odds: 100000 / 99 },
  { label: "Centena 2º premio", prize: 30, odds: 100000 / 99 },
  { label: "Últimas 3 del 1er premio", prize: 30, odds: 100000 / 99 },
  { label: "Últimas 2 del 1er premio", prize: 12, odds: 100000 / 999 },
  { label: "Reintegro 1er premio", prize: 6, odds: 100000 / 9999 },
  { label: "1ª extracción especial", prize: 6, odds: 10 },
  { label: "2ª extracción especial", prize: 6, odds: 10 }
];

export const games = [
  {
    id: "euromillones",
    name: "Euromillones",
    startsWith: "Euromillones ",
    liveName: "Euromillones",
    betPrice: 2.5,
    minimumTicketPrice: 2.5,
    jackpotCategory: "1",
    categories: [
      { key: "1", label: "1ª (5+2)", aliases: ["1ª 5 + 2"], odds: 139838160 },
      { key: "2", label: "2ª (5+1)", aliases: ["2ª 5 + 1"], odds: 6991908 },
      { key: "3", label: "3ª (5+0)", aliases: ["3ª 5 + 0"], odds: 3107515 },
      { key: "4", label: "4ª (4+2)", aliases: ["4ª 4 + 2"], odds: 621503 },
      { key: "5", label: "5ª (4+1)", aliases: ["5ª 4 + 1"], odds: 31075 },
      { key: "6", label: "6ª (3+2)", aliases: ["6ª 3 + 2"], odds: 14125 },
      { key: "7", label: "7ª (4+0)", aliases: ["7ª 4 + 0"], odds: 13811 },
      { key: "8", label: "8ª (2+2)", aliases: ["8ª 2 + 2"], odds: 985 },
      { key: "9", label: "9ª (3+1)", aliases: ["9ª 3 + 1"], odds: 706 },
      { key: "10", label: "10ª (3+0)", aliases: ["10ª 3 + 0"], odds: 314 },
      { key: "11", label: "11ª (1+2)", aliases: ["11ª 1 + 2"], odds: 188 },
      { key: "12", label: "12ª (2+1)", aliases: ["12ª 2 + 1"], odds: 49 },
      { key: "13", label: "13ª (2+0)", aliases: ["13ª 2 + 0"], odds: 22 }
    ],
    extraPrizes: [{ label: "El Millón", oddsFromBets: true, prize: 1000000 }]
  },
  {
    id: "loteria-nacional-jueves",
    name: "Lotería Nacional (jueves)",
    startsWith: "Lotería Nacional jueves ",
    liveName: "Lotería Nacional",
    liveEntryMatcher: (entry) => entry.weekday === "jueves" && entry.subtitle === "Primer premio a la serie",
    betPrice: 3,
    minimumTicketPrice: 3,
    fixedRows: loteriaNacionalJuevesRows
  },
  {
    id: "loteria-nacional-sabado",
    name: "Lotería Nacional (sábado)",
    startsWith: "Lotería Nacional sábado ",
    liveName: "Lotería Nacional",
    liveEntryMatcher: (entry) => entry.weekday === "sábado" && entry.subtitle === "Primer premio a la serie",
    betPrice: 6,
    minimumTicketPrice: 6,
    fixedRows: loteriaNacionalSabadoRows
  },
  {
    id: "primitiva",
    name: "La Primitiva",
    startsWith: "La Primitiva ",
    liveName: "La Primitiva",
    betPrice: 1,
    minimumTicketPrice: 1,
    jackpotCategory: "special",
    categories: [
      { key: "special", label: "Especial", aliases: ["Especial (6 Aciertos + R)"], odds: 139838160 },
      { key: "first", label: "1ª (6)", aliases: ["1ª (6 Aciertos)"], odds: 13983816 },
      { key: "second", label: "2ª (5+C)", aliases: ["2ª (5 Aciertos + C)"], odds: 2330636 },
      { key: "third", label: "3ª (5)", aliases: ["3ª (5 Aciertos)"], odds: 55491 },
      { key: "fourth", label: "4ª (4)", aliases: ["4ª (4 Aciertos)"], odds: 1032 },
      { key: "fifth", label: "5ª (3)", aliases: ["5ª (3 Aciertos)"], odds: 57 },
      { key: "refund", label: "Reintegro", aliases: ["Reintegro |"], odds: 10, exactLineStart: "| Reintegro |" }
    ]
  },
  {
    id: "bonoloto",
    name: "Bonoloto",
    startsWith: "Bonoloto ",
    liveName: "Bonoloto",
    betPrice: 0.5,
    minimumTicketPrice: 1,
    jackpotCategory: "first",
    categories: [
      { key: "first", label: "1ª (6)", aliases: ["1ª (6 Aciertos)"], odds: 13983816 },
      { key: "second", label: "2ª (5+C)", aliases: ["2ª (5 Aciertos + C)"], odds: 2330636 },
      { key: "third", label: "3ª (5)", aliases: ["3ª (5 Aciertos)"], odds: 55491 },
      { key: "fourth", label: "4ª (4)", aliases: ["4ª (4 Aciertos)"], odds: 1032 },
      { key: "fifth", label: "5ª (3)", aliases: ["5ª (3 Aciertos)"], odds: 57 },
      { key: "refund", label: "Reintegro", aliases: ["Reintegro |"], odds: 10, exactLineStart: "| Reintegro |" }
    ]
  },
  {
    id: "gordo",
    name: "El Gordo",
    startsWith: "El Gordo ",
    liveName: "El gordo",
    betPrice: 1.5,
    minimumTicketPrice: 1.5,
    jackpotCategory: "first",
    categories: [
      { key: "first", label: "1ª (5+1)", aliases: ["1ª (5 + 1)"], odds: 31625100 },
      { key: "second", label: "2ª (5+0)", aliases: ["2ª (5 + 0)"], odds: 3513900 },
      { key: "third", label: "3ª (4+1)", aliases: ["3ª (4 + 1)"], odds: 129082 },
      { key: "fourth", label: "4ª (4+0)", aliases: ["4ª (4 + 0)"], odds: 14342 },
      { key: "fifth", label: "5ª (3+1)", aliases: ["5ª (3 + 1)"], odds: 2689 },
      { key: "sixth", label: "6ª (3+0)", aliases: ["6ª (3 + 0)"], odds: 299 },
      { key: "seventh", label: "7ª (2+1)", aliases: ["7ª (2 + 1)"], odds: 172 },
      { key: "eighth", label: "8ª (2+0)", aliases: ["8ª (2 + 0)"], odds: 19 },
      { key: "refund", label: "Reintegro", aliases: ["Reintegro |"], odds: 10, exactLineStart: "| Reintegro |" }
    ]
  },
  {
    id: "eurodreams",
    name: "EuroDreams",
    startsWith: "EuroDreams ",
    liveName: "Eurodreams",
    betPrice: 2.5,
    minimumTicketPrice: 2.5,
    categories: [
      { key: "first", label: "1ª (6+1)", aliases: ["1ª 6 + 1"], odds: 19191900, fixedPrize: 7200000 },
      { key: "second", label: "2ª (6+0)", aliases: ["2ª 6 + 0"], odds: 4797975, fixedPrize: 120000 },
      { key: "third", label: "3ª (5+0/1)", aliases: ["3ª 5 + 0/1"], odds: 18816 },
      { key: "fourth", label: "4ª (4+0/1)", aliases: ["4ª 4 + 0/1"], odds: 456 },
      { key: "fifth", label: "5ª (3+0/1)", aliases: ["5ª 3 + 0/1"], odds: 32 },
      { key: "sixth", label: "6ª (2+0/1)", aliases: ["6ª 2 + 0/1"], odds: 6 }
    ]
  },
  {
    id: "lototurf",
    name: "Lototurf",
    startsWith: "Lototurf -",
    liveName: "Lototurf",
    betPrice: 1,
    minimumTicketPrice: 1,
    jackpotCategory: "first",
    categories: [
      { key: "first", label: "1ª", aliases: ["1ª (6 Números + Caballo Ganador)"], odds: 8835372 },
      { key: "second", label: "2ª", aliases: ["2ª (6 Números)"], odds: 803216 },
      { key: "third", label: "3ª", aliases: ["3ª (5 Números + Caballo Ganador)"], odds: 58902 },
      { key: "fourth", label: "4ª", aliases: ["4ª (5 Números)"], odds: 5355 },
      { key: "fifth", label: "5ª", aliases: ["5ª (4 Números + Caballo Ganador)"], odds: 1963 },
      { key: "sixth", label: "6ª", aliases: ["6ª (4 Números)"], odds: 178 },
      { key: "seventh", label: "7ª", aliases: ["7ª (3 Números + Caballo Ganador)"], odds: 192 },
      { key: "refund", label: "Reintegro", aliases: ["Reintegro |"], odds: 10, exactLineStart: "| Reintegro |" }
    ]
  },
  {
    id: "quintuple-plus",
    name: "Quíntuple Plus",
    startsWith: "Quíntuple Plus -",
    liveName: "Quíntuple Plus",
    betPrice: 1,
    minimumTicketPrice: 1,
    jackpotCategory: "first",
    categories: [
      { key: "first", label: "1ª", aliases: ["1ª (5 Caballos Gan+2º de 5ªCarrera)"], odds: 2737152 },
      { key: "second", label: "2ª", aliases: ["2ª (5 Caballos Ganadores)"], odds: 273715 },
      { key: "third", label: "3ª", aliases: ["3ª (4 Caballos Gan+2º de 5ªCarrera)"], odds: 49766 },
      { key: "fourth", label: "4ª", aliases: ["4ª (4 Caballos Ganadores)"], odds: 4977 }
    ]
  }
];

export const sectionBoundaries = [
  "Euromillones ",
  "Lotería Nacional jueves ",
  "Lotería Nacional sábado ",
  "La Primitiva ",
  "Bonoloto ",
  "El Gordo ",
  "EuroDreams ",
  "La Quiniela",
  "Quinigol",
  "Lototurf -",
  "Quíntuple Plus -"
];

export const liveSectionBoundaries = [
  "Euromillones",
  "La Primitiva",
  "Bonoloto",
  "El gordo",
  "Lotería Nacional",
  "La Quiniela",
  "Lototurf",
  "Quinigol",
  "Quíntuple Plus",
  "Eurodreams"
];
