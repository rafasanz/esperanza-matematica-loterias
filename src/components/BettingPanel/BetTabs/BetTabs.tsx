import { setActiveGame } from '~store/bets/bets.actions';
import type { IBetGame } from '~store/bets/bets.reducer';
import { selectActiveGame } from '~store/bets/bets.selector';
import { useAppDispatch, useAppSelector } from '~store/store';
import { cls } from '~utils/cls';

import styles from './BetTabs.module.css';

const TABS: { key: IBetGame; label: string }[] = [
  { key: 'primitiva', label: 'La Primitiva' },
  { key: 'euromillones', label: 'Euromillones' },
];

export const BetTabs = () => {
  const dispatch = useAppDispatch();

  const activeGame = useAppSelector(selectActiveGame);

  return (
    <div className={styles.BetTabs} role='tablist' aria-label='Selector de juego'>
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className={cls(activeGame === tab.key && styles.active)}
          data-game-tab={tab.key}
          onClick={() => dispatch(setActiveGame(tab.key))}
          role='tab'
          aria-selected={activeGame === tab.key}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
