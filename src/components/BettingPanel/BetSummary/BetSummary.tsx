import { useState } from 'react';

import { clearActiveBet, setRandomBet } from '~store/bets/bets.actions';
import { selectBetSummary } from '~store/bets/bets.selector';
import { useAppDispatch, useAppSelector } from '~store/store';

import styles from './BetSummary.module.css';

export const BetSummary = () => {
  const [cleanButtonLabel, setCleanButtonLabel] = useState('Limpiar');
  const [cleanButtonDisabled, setCleanButtonDisabled] = useState(false);

  const dispatch = useAppDispatch();

  const { title, entries } = useAppSelector(selectBetSummary);

  const clearBet = () => {
    setCleanButtonLabel('Apuesta limpiada');
    setCleanButtonDisabled(true);
    dispatch(clearActiveBet());
    setTimeout(() => {
      setCleanButtonLabel('Limpiar');
      setCleanButtonDisabled(false);
    }, 2_000);
  };

  return (
    <aside className={styles.BetSummary}>
      <div>
        <h3>Resumen de la apuesta</h3>
        <p className={styles.title}>{title}</p>
        <dl className={styles.list}>
          {entries.map((entry, index) => (
            <div key={index}>
              <dt>{entry.title}</dt>
              <dd>{entry.value}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.actions}>
          <button className='secondary' onClick={() => dispatch(setRandomBet())}>
            Apuesta aleatoria
          </button>
          <button className='secondary' onClick={clearBet} disabled={cleanButtonDisabled}>
            {cleanButtonLabel}
          </button>
        </div>
      </div>
    </aside>
  );
};
