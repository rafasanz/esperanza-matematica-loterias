import { createReducer } from '@reduxjs/toolkit';
import { pickRandomUnique, randomBetween } from '../../utils/random';
import {
  clearActiveBet,
  setActiveGame,
  setEuromillonesDraw,
  setJokerStatus,
  setPrimitivaDraw,
  setRandomBet,
  toggleBall,
} from './bets.actions';
import { toggleSelection } from './bets.utils';

export const betGames = ['primitiva', 'euromillones'] as const;
export type IBetGame = (typeof betGames)[number];

export type IBetBallType =
  | 'primitiva-number'
  | 'primitiva-reintegro'
  | 'euromillones-number'
  | 'euromillones-star';

export interface IBetsState {
  activeGame: IBetGame;
  primitiva: {
    draw: 'proximo' | 'semanal';
    numbers: number[];
    reintegro: number | null;
    joker: boolean;
  };
  euromillones: {
    draw: 'proximo' | 'semana';
    numbers: number[];
    stars: number[];
  };
}

export const betsInitialState: IBetsState = {
  activeGame: 'primitiva',
  primitiva: {
    draw: 'proximo',
    numbers: [],
    reintegro: null,
    joker: false,
  },
  euromillones: {
    draw: 'proximo',
    numbers: [],
    stars: [],
  },
};

export const betsReducer = createReducer(betsInitialState, (builder) => {
  builder.addCase(setActiveGame, (state, action) => {
    state.activeGame = action.payload;
  });

  builder.addCase(toggleBall, (state, action) => {
    switch (action.payload.type) {
      case 'primitiva-number': {
        state.primitiva.numbers = toggleSelection(
          [...state.primitiva.numbers],
          action.payload.value,
          6,
        );
        break;
      }
      case 'primitiva-reintegro': {
        state.primitiva.reintegro =
          state.primitiva.reintegro === action.payload.value
            ? null
            : action.payload.value;
        break;
      }
      case 'euromillones-number': {
        state.euromillones.numbers = toggleSelection(
          [...state.euromillones.numbers],
          action.payload.value,
          5,
        );
        break;
      }
      case 'euromillones-star': {
        state.euromillones.stars = toggleSelection(
          [...state.euromillones.stars],
          action.payload.value,
          2,
        );
        break;
      }
      default:
        action.payload.type satisfies never;
    }
  });

  builder.addCase(clearActiveBet, (state) => {
    if (state.activeGame === 'primitiva') {
      state.primitiva = {
        draw: 'proximo',
        numbers: [],
        reintegro: null,
        joker: false,
      };
    } else {
      state.euromillones = {
        draw: 'proximo',
        numbers: [],
        stars: [],
      };
    }
  });

  builder.addCase(setJokerStatus, (state, action) => {
    state.primitiva.joker = action.payload;
  });

  builder.addCase(setPrimitivaDraw, (state, action) => {
    state.primitiva.draw = action.payload;
  });

  builder.addCase(setEuromillonesDraw, (state, action) => {
    state.euromillones.draw = action.payload;
  });

  builder.addCase(setRandomBet, (state) => {
    if (state.activeGame === 'primitiva') {
      state.primitiva.numbers = pickRandomUnique(6, 1, 49).sort(
        (a, b) => a - b,
      );
      state.primitiva.reintegro = randomBetween(0, 9);
    } else {
      state.euromillones.numbers = pickRandomUnique(5, 1, 50).sort(
        (a, b) => a - b,
      );
      state.euromillones.stars = pickRandomUnique(2, 1, 12).sort(
        (a, b) => a - b,
      );
    }
  });
});
