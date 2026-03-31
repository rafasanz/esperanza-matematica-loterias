import type { IExtraPrize, IGame, IRow } from './game';

export type IJackpotSource = 'bote-vigente' | 'bote-acumulado' | null;

export interface IParsedGame extends Pick<
  IGame,
  'id' | 'name' | 'betPrice' | 'minimumTicketPrice' | 'jackpotCategory'
> {
  drawDate: string | null;
  resultDate: string | null;
  advertisedJackpot: number | null;
  advertisedJackpotSource: IJackpotSource;
  liveAdvertisedJackpot: number | null;
  resultAdvertisedJackpot: number | null;
  betsReceived: number | null;
  fixedRows: IRow[];
  categories: IParsedCategory[];
  extraPrizes: (Omit<IExtraPrize, 'oddsFromBets'> & {
    odds: number | false | null;
  })[];
  liveSubtitle: string | null;
}

export interface IParsedCategory {
  line: string | null;
  prize: number | null;
  winners: number | null;
  aliases: string[];
  exactLineStart?: string | undefined;
  fixedPrize?: number | undefined;
  key: string;
  label: string;
  odds: number;
}
