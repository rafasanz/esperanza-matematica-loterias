import { getBettingGridShape } from '../betting.utils';

import { setJokerStatus, setPrimitivaDraw } from '~store/bets/bets.actions';
import type { IBetsState } from '~store/bets/bets.reducer';
import { selectSelectedDraw } from '~store/bets/bets.selector';
import { useAppDispatch, useAppSelector } from '~store/store';
import { cls } from '~utils/cls';
import { Ball } from '../Ball/Ball';
import styles from '../BettingPanel.module.css';

const MAIN_GRID_COLUMNS = 10;
const MAIN_GRID_SHAPE = getBettingGridShape(49, 'primitiva-number', {
  startAt: 1,
  groupSize: MAIN_GRID_COLUMNS,
});
const REINTEGRO_GRID_SHAPE = getBettingGridShape(10, 'primitiva-reintegro', {
  startAt: 0,
  compact: true,
});

export const Primitiva = () => {
  const dispatch = useAppDispatch();

  const selectedDraw = useAppSelector(selectSelectedDraw);

  const drawButtons: { key: IBetsState['primitiva']['draw']; label: string }[] =
    [
      {
        key: 'proximo',
        label: 'Próximo sorteo',
      },
      {
        key: 'semanal',
        label: 'Semanal',
      },
    ];

  return (
    <section className={styles.betCard} data-bet-panel="primitiva">
      <div className={styles.betCardHead}>
        <h3>La Primitiva</h3>
        <span className={styles.betPrice}>1,00 € por apuesta</span>
      </div>
      <div className={styles.choiceBlock}>
        <p className={styles.title}>Sorteo</p>
        <div className={styles.pillGroup}>
          {drawButtons.map(({ key, label }) => (
            <button
              key={key}
              className={cls(selectedDraw === key && styles.active)}
              onClick={() => dispatch(setPrimitivaDraw(key))}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.choiceBlock}>
        <div className={styles.choiceRow}>
          <p className={styles.title}>Selecciona 6 números</p>
        </div>
        <div className={styles.numberGrid}>
          {MAIN_GRID_SHAPE.map(({ balls, maxValue, value }, groupIndex) => (
            <div key={groupIndex} className={styles.ballRow}>
              <div className={styles.ballRowLabel}>
                {String(value).padStart(2, '0')}-
                {String(maxValue).padStart(2, '0')}
              </div>
              <div
                className={styles.ballRowItems}
                style={
                  { '--row-count': MAIN_GRID_COLUMNS } as React.CSSProperties
                }
              >
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
          <p className={styles.choiceTitle}>Reintegro</p>
        </div>
        <div className={styles.tinyGrid}>
          {REINTEGRO_GRID_SHAPE.map((ballProps, index) => (
            <Ball key={index} {...ballProps} />
          ))}
        </div>
      </div>
      <div className={cls(styles.choiceBlock, styles.toggleLine)}>
        <label className={styles.switchRow}>
          <input
            type="checkbox"
            onChange={(event) => {
              dispatch(setJokerStatus(event.target.checked));
            }}
          />
          <span>Jugar también a El Joker (+1,00 €)</span>
        </label>
      </div>
    </section>
  );
};
