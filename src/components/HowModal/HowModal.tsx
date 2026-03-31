import { useRef, type ComponentProps, type FC } from 'react';
import { useActionOnClickOutside } from '~hooks/useActionOnClickOutside';

import styles from './HowModal.module.css';

interface IHowModalProps extends ComponentProps<'div'> {
  close: () => void;
}

export const HowModal: FC<IHowModalProps> = ({ close }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useActionOnClickOutside([modalRef], close);

  return (
    <div className={styles.HowModal}>
      <div className={styles.content} ref={modalRef}>
        <div className={styles.header}>
          <h2>Cómo se calcula la esperanza matemática</h2>
          <button onClick={close}>Cerrar</button>
        </div>
        <p>
          Para cada sorteo se suma el valor esperado de todas sus categorías:{' '}
          <strong>probabilidad de acertar x premio de la categoría</strong>.
        </p>
        <p>
          Después se compara ese retorno esperado con la apuesta mínima del
          sorteo:{' '}
          <strong>esperanza neta = retorno esperado - coste de entrada</strong>.
        </p>
        <p>
          En juegos con bote variable se usa el premio publicado en resultados.
          En Lotería Nacional se usa la tabla oficial estándar del jueves o del
          sábado, porque en la página de resultados no aparecen todas sus
          categorías.
        </p>
      </div>
    </div>
  );
};
