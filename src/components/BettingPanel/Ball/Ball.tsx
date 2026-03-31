import type { FC } from 'react';

import { toggleBall } from '~store/bets/bets.actions';
import type { IBetBallType } from '~store/bets/bets.reducer';
import { selectIsBallActive } from '~store/bets/bets.selector';
import { useAppDispatch, useAppSelector } from '~store/store';
import { cls } from '~utils/cls';
import styles from './Ball.module.css';

export interface IBallProps {
  isStar: boolean;
  type: IBetBallType;
  value: number;
}

export const Ball: FC<IBallProps> = ({ isStar, type, value }) => {
  const dispatch = useAppDispatch();

  const isActive = useAppSelector((state) =>
    selectIsBallActive(state, { type, value }),
  );

  return (
    <button
      onClick={() => dispatch(toggleBall({ type, value }))}
      className={cls(
        styles.Ball,
        isStar && styles.starBall,
        isActive && styles.active,
      )}
      data-ball-type={type}
      data-ball-value={value}
    >
      <span className={styles.ballText}>{String(value).padStart(2, '0')}</span>
      {isStar && (
        <svg
          className={styles.starShape}
          viewBox="0 0 100 100"
          aria-hidden="true"
          focusable="false"
        >
          <polygon points="50,1 61,35 98,35 68,57 79,95 50,73 21,95 32,57 2,35 39,35"></polygon>
        </svg>
      )}
    </button>
  );
};
