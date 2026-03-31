import { useState } from 'react';

import { HowModal } from '~components/HowModal/HowModal';
import { useTheme } from '~hooks/useTheme';
import { loadGamesRanking } from '~store/gamesRanking/gamesRanking.actions';
import { useAppDispatch, useAppSelector } from '~store/store';

import styles from './Header.module.css';

export const Header = () => {
  const [showHowModal, setShowHowModal] = useState(false);

  const { currentTheme, toggleTheme } = useTheme();

  const dispatch = useAppDispatch();

  const loadingStatus = useAppSelector((state) => state.gamesRanking.loadingStatus);

  return (
    <>
      <header className={styles.Header}>
        <div className={styles.title}>
          <h1>Esperanza matemática de loterías</h1>
          <div className={styles.actions}>
            <button className='secondary' onClick={toggleTheme}>
              Modo {currentTheme === 'dark' ? 'claro' : 'oscuro'}
            </button>
            <button className='secondary' onClick={() => setShowHowModal(true)}>
              Cómo se calcula
            </button>
          </div>
        </div>
        <p>
          Obtiene los resultados publicados por la Sociedad Estatal de Loterías y Apuestas del Estado (SELAE) y ordena
          los sorteos por esperanza matemática estimada según la apuesta mínima.
        </p>
        <button disabled={loadingStatus === 'loading'} onClick={() => dispatch(loadGamesRanking())}>
          {loadingStatus === 'loading' ? 'Cargando...' : 'Recargar'}
        </button>
      </header>

      {showHowModal && <HowModal close={() => setShowHowModal(false)} />}
    </>
  );
};
