import type { IGameRanking } from '~models/gameRanking';
import { formatCurrency } from '~utils/i18n';

import styles from './DetailsMetadata.module.css';

interface IDetailsMetadataProps {
  game: IGameRanking;
}

export const DetailsMetadata = ({ game }: IDetailsMetadataProps) => {
  const meta = [`Próximo sorteo: ${game.drawDate || '-'}`];

  if (game.resultDate) {
    meta.push(`Último resultado consultado: ${game.resultDate}`);
  }

  if (game.fixedRows.length > 0) {
    meta.push(`Máxima categoría usada: ${formatCurrency(game.topPrize)}`);
  } else {
    if (game.advertisedJackpot) {
      meta.push(`Premio máximo vigente usado: ${formatCurrency(game.advertisedJackpot)}`);
    } else {
      meta.push(
        'Premio máximo vigente: no publicado por la Sociedad Estatal de Loterías y Apuestas del Estado (SELAE) para el sorteo en juego'
      );
    }

    if (game.expectationStatus !== 'exacta') {
      meta.push(
        'Esperanza matemática exacta: no disponible hasta que la Sociedad Estatal de Loterías y Apuestas del Estado (SELAE) publique la categoría máxima vigente'
      );
    }
  }

  return (
    <p className={styles.detailsMetadata}>
      {meta.map((data, index) => (
        <span key={index}>{data}</span>
      ))}
    </p>
  );
};
