import type { IParsedGame } from './parsedGame';

export interface IGameRanking extends IParsedGame {
  rows: IGameRankingRow[];
  topPrize: number | null;
  expectationStatus: string;
  expectedPayout: number | null;
  expectedNet: number | null;
  knownExpectedPayout?: number;
}

export interface IGameRankingRow {
  label: string;
  prize: number | null;
  odds: number;
  expected: number | null;
  source?: string;
}
