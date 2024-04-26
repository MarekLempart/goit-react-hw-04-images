// App.js

import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { getSearchImages } from './Api/getSearch';
import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Modal } from './Modal/Modal'; // Moda
import Modal from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPage, setLastPage] = useState(0);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({
    showModal: false,
    largeImageURL: '',
    alt: '',
  });
  const [empty, setEmpty] = useState(false);

  // Obsługa przesłania formularza wyszukiwania
  const handleChange = search => {
    setInputValue(search.target.value);
  };
  // Obsługa czyszczenia formularza wyszukiwania
  const onClickClear = () => {
    setInputValue('');
  };

  // Funkcja do pobrania danych
  const handleSubmit = async event => {
    event.preventDefault();
    if (inputValue === '') {
      alert('Please enter your query');
      return;
    }
    if (query === inputValue) return;

    try {
      const response = await getSearchImages(inputValue, page);
      setImages(prevState => [...prevState, ...response.hits]);
      setLastPage(Math.ceil(response.totalHits / 12));
      response.totalHits === 0 && setEmpty(true);
      setQuery(inputValue);
    } catch (error) {
      setError(error);
    } finally {
      setPage(1);
    }
  };

  // Obsługa kliknięcia przycisku "Load more"
  const handleLoadMore = () => {
    setPage(prevState => prevState.page + 1); // Zwiększenie numeru strony o 1
  };

  // Zmiena wartość modala na przeciwną
  const toggleModal = () => {
    setModal(prevState => ({ ...prevState, showModal: !prevState.showModal }));
  };

  // Obsługa otwierania modala
  const openModal = (largeImageURL, alt) => {
    setModal(prevState => ({ ...prevState, largeImageURL, alt }));
    toggleModal();
  };

  useEffect(() => {
    if (page === 0) return;

    const getSearchImagesByQuery = async searchQuery => {
      setIsLoading(true);
      setError(null);
      setEmpty(false);

      try {
        const response = await getSearchImages(searchQuery, page);
        setImages(prevState => [...prevState, ...response.hits]);
        setLastPage(Math.ceil(response.totalHits / 12));
        response.totalHits === 0 && setEmpty(true);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getSearchImagesByQuery(query);
  }, [page, query]);

  return (
    <div>
      <Searchbar
        onSubmit={handleSubmit}
        onChange={handleChange}
        onClickClear={onClickClear}
        inputValue={inputValue}
      />

      {error && (
        <h2 style={{ textAlign: 'center' }}>Coś poszło nie tak: ({error})!</h2>
      )}

      {empty && (
        <h2 style={{ textAlign: 'center' }}>
          Przepraszamy. Brak obrazków ... 😭
        </h2>
      )}

      {isLoading && <Loader />}
      <ImageGallery images={images} onImageClick={openModal} />

      {page < lastPage && !isLoading ? (
        <Button label="Load more" handleLoadMore={handleLoadMore} />
      ) : (
        <div style={{ height: 40 }}></div>
      )}

      {modal.showModal && (
        <Modal
          onClose={toggleModal}
          largeImageURL={modal.largeImageURL}
          alt={modal.alt}
        />
      )}
    </div>
  );
};
