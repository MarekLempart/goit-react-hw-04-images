// ImageGalleryItem.jsx

import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

// Funkcyjny komponent odpowiedzialny za pojedynczy element galerii.
export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  toggleModal,
}) => (
  <li className={css.ImageGalleryItem}>
    <img
      className={css.ImageGalleryItemImage}
      src={webformatURL}
      alt=""
      onClick={() => toggleModal(largeImageURL)}
      loading="lazy"
    />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
};
