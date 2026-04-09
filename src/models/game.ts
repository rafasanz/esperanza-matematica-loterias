import type { ILiveEntry } from './liveEntry';

export interface IGame {
  id: string;
  name: string;
  startsWith: string;
  liveName: string;
  betPrice: number;
  minimumTicketPrice: number;
  jackpotCategory?: string;
  categories?: ICategory[];
  extraPrizes?: IExtraPrize[];
  liveEntryMatcher?: (entry: ILiveEntry) => boolean;
  fixedRows?: IRow[];
}

export interface ICategory {
  aliases: string[];
  exactLineStart?: string;
  fixedPrize?: number;
  key: string;
  label: string;
  odds: number;
}

export interface IExtraPrize {
  label: string;
  oddsFromBets: boolean;
  prize: number;
}

export interface IRow {
  label: string;
  odds: number;
  prize: number;
}
