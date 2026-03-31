import { author, version } from '../../../package.json';

import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <span className={styles.version}>v{version}</span>
        <a href={author.url} target='_blank' rel='noreferrer'>
          @{author.name}
        </a>
      </p>
    </footer>
  );
};
