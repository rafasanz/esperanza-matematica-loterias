import type { RootState } from './rootReducer';

export const betsSelector = (state: RootState) => state.bets;

export const gamesRankingSelector = (state: RootState) => state.gamesRanking;
