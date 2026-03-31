import { createSelector } from '@reduxjs/toolkit';
import { formatCurrency } from '../../utils/i18n';
import { betsSelector } from '../rootSelector';
import type { ISelector } from '../store';
import type { IBetBallType, IBetGame } from './bets.reducer';
import { formatBallList } from './bets.utils';

export const selectActiveGame: ISelector<IBetGame> = createSelector(
  [betsSelector],
  (state) => state.activeGame,
);

export const selectIsBallActive: ISelector<
  boolean,
  [{ type: IBetBallType; value: number }]
> = createSelector(
  [
    betsSelector,
    (_, ballArgs: { type: IBetBallType; value: number }) => ballArgs,
  ],
  (state, ballArgs) => {
    switch (ballArgs.type) {
      case 'primitiva-number':
        return state.primitiva.numbers.includes(ballArgs.value);
      case 'primitiva-reintegro':
        return state.primitiva.reintegro === ballArgs.value;
      case 'euromillones-number':
        return state.euromillones.numbers.includes(ballArgs.value);
      case 'euromillones-star':
        return state.euromillones.stars.includes(ballArgs.value);
      default:
        ballArgs.type satisfies never;
    }
    return false;
  },
);

export const selectBetSummary: ISelector<{
  title: string;
  entries: { title: string; value: string }[];
}> = createSelector([betsSelector], (state) => {
  let title: string;
  let entries: { title: string; value: string }[];

  if (state.activeGame === 'primitiva') {
    title = 'La Primitiva';
    entries = [
      {
        title: 'Números',
        value: formatBallList(state.primitiva.numbers),
      },
      {
        title: 'Reintegro',
        value: String(state.primitiva.reintegro ?? '-'),
      },
      {
        title: 'Extra',
        value: `${state.primitiva.joker ? 'Con' : 'Sin'} Joker`,
      },
    ];
  } else {
    title = 'Euromillones';
    entries = [
      {
        title: 'Números',
        value: formatBallList(state.euromillones.numbers),
      },
      {
        title: 'Estrellas',
        value: formatBallList(state.euromillones.stars),
      },
    ];
  }

  let drawLabel = 'Próximo sorteo';
  if (state.activeGame === 'primitiva') {
    if (state.primitiva.draw === 'semanal') {
      drawLabel = 'Semanal';
    }
  } else {
    if (state.euromillones.draw === 'semana') {
      drawLabel = 'Dos sorteos de la semana';
    }
  }
  entries.push({ title: 'Sorteo', value: drawLabel });

  let total = 1 + (state.primitiva.joker ? 1 : 0);
  if (state.activeGame === 'euromillones') {
    total = state.euromillones.draw === 'semana' ? 5 : 2.5;
  }
  entries.push({ title: 'Total', value: formatCurrency(total) });

  return { title, entries };
});

export const selectSelectedDraw = createSelector([betsSelector], (state) => {
  if (state.activeGame === 'primitiva') {
    return state.primitiva.draw;
  } else {
    return state.euromillones.draw;
  }
});
