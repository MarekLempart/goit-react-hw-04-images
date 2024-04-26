// ImageGalleryItem.jsx

import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

// Funkcyjny komponent odpowiedzialny za pojedynczy element galerii.
export const ImageGalleryItem = ({ image, toggleModal }) => {
  const { id, largeImageURL, tags, webformatURL } = image;

  return (
    <li
      key={id} // Używamy unikalnego identyfikatora dla każdego elementu
      onClick={() => toggleModal(largeImageURL, tags)}
      className={css.ImageGalleryItem}
    >
      <img
        loading="lazy"
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
