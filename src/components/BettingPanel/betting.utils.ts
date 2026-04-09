import type { IBetBallType } from '~store/bets/bets.reducer';

import type { IBallProps } from './Ball/Ball';

type IBettingGridShapeGroup = {
  balls: IBallProps[];
  maxValue: number;
  value: number;
};

export function getBettingGridShape(
  count: number,
  type: IBetBallType,
  options: {
    startAt?: number;
    groupSize?: number;
    isStar?: boolean;
    compact: true;
  }
): IBallProps[];
export function getBettingGridShape(
  count: number,
  type: IBetBallType,
  options: {
    startAt?: number;
    groupSize?: number;
    isStar?: boolean;
    compact?: false;
  }
): IBettingGridShapeGroup[];
export function getBettingGridShape(
  count: number,
  type: IBetBallType,
  options: {
    startAt?: number;
    groupSize?: number;
    isStar?: boolean;
    compact?: boolean;
  } = {}
): IBallProps[] | IBettingGridShapeGroup[] {
  const startAt = options.startAt ?? 1;
  const groupSize = options.groupSize ?? count;
  const isStar = options.isStar ?? false;

  if (options.compact) {
    const items: IBallProps[] = [];

    for (let value = startAt; value < startAt + count; value += 1) {
      items.push({ isStar, type, value });
    }

    return items;
  }

  const groups: IBettingGridShapeGroup[] = [];
  for (let value = startAt; value < startAt + count; value += groupSize) {
    const balls: IBallProps[] = [];
    const maxValue = Math.min(value + groupSize - 1, startAt + count - 1);

    for (let current = value; current <= maxValue; current += 1) {
      balls.push({ isStar, type, value: current });
    }

    groups.push({ balls, maxValue, value });
  }

  return groups;
}
