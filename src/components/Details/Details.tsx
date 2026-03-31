import { useAppSelector } from '~store/store';

import styles from './Details.module.css';
import { DetailsMetadata } from './DetailsMetadata/DetailsMetadata';
import { DetailsRows } from './DetailsRows/DetailsRows';

export const Details = () => {
  const ranking = useAppSelector((state) => state.gamesRanking.ranking);

  return (
    <section className={styles.details}>
      {ranking.map((game, index) => (
        <article key={index} className={styles.detailCard}>
          <h2>{game.name}</h2>
          <DetailsMetadata game={game} />
          <DetailsRows rows={game.rows} />
        </article>
      ))}
    </section>
  );
};
