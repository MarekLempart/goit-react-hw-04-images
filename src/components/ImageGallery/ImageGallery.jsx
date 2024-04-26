// ImageGallery.jsx

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, toggleModal }) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id} // Unikalny klucz dla każdego elementu listy
            image={image} // Przekazujemy obiekt image jako props do ImageGalleryItem
            toggleModal={toggleModal}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
