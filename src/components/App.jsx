// App.js

import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { getSearchImages } from './Api/getSearch';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (search !== '' || page !== 1) {
      getSearchImages(search, page)
        .then(resp => resp.json())
        .then(data => {
          const newImages = data.hits.filter(
            newImage =>
              !images.some(existingImage => existingImage.id === newImage.id)
          );
          if (data.hits.length === 0) {
            setEmpty(true);
          }
          setImages(prevImages => [...prevImages, ...newImages]);
          setTotal(data.total);
        })
        .catch(error => setError(error.message))
        .finally(() => setLoading(false));
    }
  }, [search, page, images]);

  const handleSubmit = search => {
    setSearch(search);
    setImages([]);
    setPage(1);
    setTotal(1);
    setLoading(false);
    setError(null);
    setEmpty(false);
  };

  const clickLoad = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (largeImageURL, alt) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setAlt(alt);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
    setAlt('');
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          duration: 1500,
        }}
      />
      <Searchbar handleSubmit={handleSubmit} />
      {error && (
        <h2 style={{ textAlign: 'center' }}>Coś poszło nie tak: ({error})!</h2>
      )}
      <ImageGallery toggleModal={openModal} images={images} />
      {loading && <Loader />}
      {empty && (
        <h2 style={{ textAlign: 'center' }}>
          Przepraszamy. Brak obrazków ... 😭
        </h2>
      )}
      {total / 12 > page && <Button clickLoad={clickLoad} />}
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        largeImageURL={largeImageURL}
        alt={alt}
      />
    </div>
  );
};

export default App;
