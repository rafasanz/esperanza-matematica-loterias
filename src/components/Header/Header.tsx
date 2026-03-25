import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { HowModal } from './HowModal';

export const Header = () => {
  const { currentTheme, toggleTheme } = useTheme();

  const [showHowModal, setShowHowModal] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-top">
          <h1>Esperanza matemática de loterías</h1>
          <div className="header-actions">
            <button
              id="theme-button"
              className="secondary"
              onClick={toggleTheme}
            >
              Modo {currentTheme === 'dark' ? 'claro' : 'oscuro'}
            </button>
            <button className="secondary" onClick={() => setShowHowModal(true)}>
              Cómo se calcula
            </button>
          </div>
        </div>
        <p>
          Obtiene los resultados publicados por la Sociedad Estatal de Loterías
          y Apuestas del Estado (SELAE) y ordena los sorteos por esperanza
          matemática estimada según la apuesta mínima.
        </p>
        <button id="reload" type="button">
          Recargar
        </button>
      </header>

      {showHowModal && <HowModal close={() => setShowHowModal(false)} />}
    </>
  );
};
