import { setEuromillonesDraw } from '~store/bets/bets.actions';
import type { IBetsState } from '~store/bets/bets.reducer';
import { selectSelectedDraw } from '~store/bets/bets.selector';
import { useAppDispatch, useAppSelector } from '~store/store';
import { cls } from '~utils/cls';

import { Ball } from '../Ball/Ball';
import { getBettingGridShape } from '../betting.utils';

import styles from '../BettingPanel.module.css';

const MAIN_GRID_COLUMNS = 10;
const STARS_GRID_COLUMN = 6;
const MAIN_GRID_SHAPE = getBettingGridShape(50, 'euromillones-number', {
  startAt: 1,
  groupSize: MAIN_GRID_COLUMNS,
});
const STARS_GRIP_SHAPE = getBettingGridShape(12, 'euromillones-star', {
  startAt: 1,
  groupSize: STARS_GRID_COLUMN,
  isStar: true,
});

export const Euromillones = () => {
  const dispatch = useAppDispatch();

  const selectedDraw = useAppSelector(selectSelectedDraw);

  const drawButtons: {
    key: IBetsState['euromillones']['draw'];
    label: string;
  }[] = [
    {
      key: 'proximo',
      label: 'Próximo sorteo',
    },
    {
      key: 'semana',
      label: 'Dos sorteos de la semana',
    },
  ];

  return (
    <section className={styles.betCard} data-bet-panel='euromillones'>
      <div className={styles.betCardHead}>
        <h3>Euromillones</h3>
        <span className={styles.betPrice}>2,50 € por apuesta</span>
      </div>
      <div className={styles.choiceBlock}>
        <p className={styles.choiceTitle}>Sorteo</p>
        <div className={styles.pillGroup}>
          {drawButtons.map(({ key, label }) => (
            <button
              key={key}
              className={cls(selectedDraw === key && styles.active)}
              onClick={() => dispatch(setEuromillonesDraw(key))}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.choiceBlock}>
        <div className={styles.choiceRow}>
          <p className={styles.choiceTitle}>Selecciona 5 números</p>
        </div>
        <div className={styles.numberGrid}>
          {MAIN_GRID_SHAPE.map(({ balls, maxValue, value }, groupIndex) => (
            <div key={groupIndex} className={styles.ballRow}>
              <div className={styles.ballRowLabel}>
                {String(value).padStart(2, '0')}-{String(maxValue).padStart(2, '0')}
              </div>
              <div className={styles.ballRowItems} style={{ '--row-count': MAIN_GRID_COLUMNS } as React.CSSProperties}>
                {balls.map((ballProps, ballIndex) => (
                  <Ball key={ballIndex} {...ballProps} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.choiceBlock}>
        <div className={styles.choiceRow}>
          <p className={styles.choiceTitle}>Selecciona 2 estrellas</p>
        </div>
        <div id='euromillones-stars-grid' className={styles.starGrid}>
          {STARS_GRIP_SHAPE.map(({ balls, maxValue, value }, groupIndex) => (
            <div key={groupIndex} className={styles.ballRow}>
              <div className={styles.ballRowLabel}>
                {String(value).padStart(2, '0')}-{String(maxValue).padStart(2, '0')}
              </div>
              <div className={styles.ballRowItems} style={{ '--row-count': STARS_GRID_COLUMN } as React.CSSProperties}>
                {balls.map((ballProps, ballIndex) => (
                  <Ball key={ballIndex} {...ballProps} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
