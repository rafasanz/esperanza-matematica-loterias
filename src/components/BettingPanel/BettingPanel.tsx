import { selectActiveGame } from '~store/bets/bets.selector';
import { useAppSelector } from '~store/store';
import { BetSummary } from './BetSummary/BetSummary';
import { BetTabs } from './BetTabs/BetTabs';
import styles from './BettingPanel.module.css';
import { Euromillones } from './Euromillones/Euromillones';
import { Primitiva } from './Primitiva/Primitiva';

export const BettingPanel = () => {
  const activeGame = useAppSelector(selectActiveGame);

  return (
    <section className={styles.BettingPanel}>
      <div className={styles.bettingHead}>
        <div>
          <h2>Preparar apuesta</h2>
          <p className={styles.bettingCopy}>
            Apartado visual para montar apuestas de La Primitiva y Euromillones
            inspirado en la estructura del portal oficial.
          </p>
        </div>
      </div>

      <BetTabs />

      <div className={styles.betLayout}>
        <div>
          {activeGame === 'primitiva' ? <Primitiva /> : <Euromillones />}
        </div>

        <BetSummary />
      </div>
    </section>
  );
};
