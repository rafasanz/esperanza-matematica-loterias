import { combineReducers } from '@reduxjs/toolkit';

import { betsReducer } from './bets/bets.reducer';
import { gamesRankingReducer } from './gamesRanking/gamesRanking.reducer';

const rootReducer = combineReducers({
  bets: betsReducer,
  gamesRanking: gamesRankingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
