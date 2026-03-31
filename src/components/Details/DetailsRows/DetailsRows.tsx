import type { IGameRankingRow } from '../../../models/gameRanking';
import { formatCurrency, formatNumber } from '../../../utils/i18n';
import styles from './DetailsRows.module.css';

interface IDetailsRowsProps {
  rows: IGameRankingRow[];
}

const LABELS: Record<string, string> = {
  'ultimo-resultado': 'último resultado publicado',
  'bote-vigente': 'sorteo en juego',
  'bote-acumulado': 'último bote acumulado sin acertantes',
  'premio-fijo': 'importe fijo',
  'premio-resuelto': 'no reutilizado: ya adjudicado',
  'vigente-no-publicado':
    'La Sociedad Estatal de Loterías y Apuestas del Estado (SELAE) no publica el premio máximo vigente y el último ya resuelto no se reutiliza',
  'sin-bote-vigente': 'sin bote vigente publicado',
  'sin-dato': 'sin dato oficial suficiente',
} as const;

/**
 * Traduce claves internas de procedencia del premio a textos legibles para el usuario.
 */
function describePrizeSource(source: IGameRankingRow['source']) {
  const defaultDesc = 'dato disponible';

  if (!source) {
    return defaultDesc;
  }

  return LABELS[source] || defaultDesc;
}

export const DetailsRows = ({ rows }: IDetailsRowsProps) => {
  return (
    <div className={styles.detailsRows}>
      {rows.map((row, index) => (
        <article key={index} className={styles.detailItem}>
          <h3>{row.label}</h3>
          <p>
            <strong>Premio usado:</strong> {formatCurrency(row.prize, 'N/D')}
          </p>
          <p>
            <strong>Probabilidad:</strong> 1 entre {formatNumber(row.odds)}
          </p>
          <p>
            <strong>Valor esperado:</strong>{' '}
            {formatCurrency(row.expected, 'N/D')}
          </p>
          <p className="detail-item-source">
            {describePrizeSource(row.source)}
          </p>
        </article>
      ))}
    </div>
  );
};
