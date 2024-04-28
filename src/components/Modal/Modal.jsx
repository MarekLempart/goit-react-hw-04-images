// Modal.jsx

import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ showModal, closeModal, largeImageURL, alt }) => {
  useEffect(() => {
    const handleEscPress = evt => {
      if (evt.keyCode === 27) {
        closeModal();
      }
    };

    const handleKeyDown = evt => {
      handleEscPress(evt);
    };

    if (showModal) {
      document.body.style.overflow = 'hidden'; // Zablokowanie przewijania strony podczas wyświetlania modala
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = 'auto'; // Przywrócenie normalnego przewijania strony po zamknięciu modala
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showModal, closeModal]);

  if (!showModal) return null;

  return (
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={alt} />
      </div>
    </div>
  );
};
