import { createReducer } from '@reduxjs/toolkit';

import type { IGameRanking } from '~models/gameRanking';

import { loadGamesRanking } from './gamesRanking.actions';

export type ILoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export interface IGamesRankingState {
  lastLoadTime?: string;
  loadError?: string;
  loadingStatus: ILoadingStatus;
  ranking: IGameRanking[];
}

const gamesRankingInitialState: IGamesRankingState = {
  loadingStatus: 'idle',
  ranking: [],
};

export const gamesRankingReducer = createReducer(gamesRankingInitialState, (builder) => {
  builder.addCase(loadGamesRanking.pending, (state) => {
    state.loadError = undefined;
    state.loadingStatus = 'loading';
    state.ranking = [];
  });

  builder.addCase(loadGamesRanking.rejected, (state, action) => {
    state.lastLoadTime = new Date().toLocaleString('es-ES');
    state.loadError = action.error.message;
    state.loadingStatus = 'error';
    state.ranking = [];
  });

  builder.addCase(loadGamesRanking.fulfilled, (state, action) => {
    state.lastLoadTime = new Date().toLocaleString('es-ES');
    state.loadError = undefined;
    state.loadingStatus = 'success';
    state.ranking = action.payload;
  });
});
