import { createAction } from '@reduxjs/toolkit';

import type { IBetBallType, IBetGame, IBetsState } from './bets.reducer';

export const setActiveGame = createAction<IBetGame>('SET_ACTIVE_GAME');

export const setJokerStatus = createAction<boolean>('SET_JOKER_STATUS');

export const toggleBall = createAction<{ type: IBetBallType; value: number }>('TOGGLE_BALL');

export const setPrimitivaDraw = createAction<IBetsState['primitiva']['draw']>('SET_PRIMITIVA_DRAW');

export const setEuromillonesDraw = createAction<IBetsState['euromillones']['draw']>('SET_EUROMILLONES_DRAW');

export const clearActiveBet = createAction('CLEAR_ACTIVE_BET');

export const setRandomBet = createAction('SET_RANDOM_BET');
