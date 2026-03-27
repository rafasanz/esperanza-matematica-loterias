import type { ILoadingStatus } from '../../store/gamesRanking/gamesRanking.reducer';
import { useAppSelector } from '../../store/store';
import { cls } from '../../utils/cls';
import { formatCurrency } from '../../utils/i18n';

import styles from './RankingTable.module.css';

function getStatusLabel(
  status: ILoadingStatus,
  lastLoadTime: string | undefined,
  loadError: string | undefined,
) {
  switch (status) {
    case 'idle':
      return 'Esperando para cargar datos...';
    case 'loading':
      return 'Cargando datos...';
    case 'success':
      return `Datos cargados el ${lastLoadTime}`;
    case 'error':
      return `No se pudieron cargar los datos: ${loadError}`;
    default:
      status satisfies never;
  }
}

export const RankingTable = () => {
  const { loadingStatus, lastLoadTime, loadError, ranking } = useAppSelector(
    (state) => state.gamesRanking,
  );

  return (
    <div className={styles.RankingTable}>
      <section>
        <p>{getStatusLabel(loadingStatus, lastLoadTime, loadError)}</p>
        <p className={styles.source}>
          Fuente oficial de la Sociedad Estatal de Loterías y Apuestas del
          Estado (SELAE):{' '}
          <a
            href="https://www.loteriasyapuestas.es/es/resultados"
            target="_blank"
            rel="noreferrer"
          >
            Resultados SELAE
          </a>
        </p>
      </section>
      <section>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Sorteo</th>
                <th className={styles.date}>Fecha</th>
                <th className={styles.currency}>Premio máxima categoría</th>
                <th className={styles.currency}>Apuesta mínima</th>
                <th className={styles.currency}>Retorno esperado</th>
                <th className={styles.currency}>Esperanza neta</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((game, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{game.name}</td>
                  <td className={styles.date}>{game.drawDate || '-'}</td>
                  <td
                    className={cls(
                      styles.currency,
                      game.topPrize == null && styles.na,
                    )}
                  >
                    {formatCurrency(game.topPrize, 'N/D')}
                  </td>
                  <td className={styles.currency}>
                    {formatCurrency(game.minimumTicketPrice)}
                  </td>
                  <td
                    className={cls(
                      styles.currency,
                      game.expectedPayout == null && styles.na,
                    )}
                  >
                    {formatCurrency(game.expectedPayout, 'N/D')}
                  </td>
                  <td
                    className={cls(
                      styles.currency,
                      game.expectedNet == null
                        ? styles.na
                        : game.expectedNet >= 0
                          ? styles.positive
                          : styles.negative,
                    )}
                  >
                    {formatCurrency(game.expectedNet, 'N/D')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
