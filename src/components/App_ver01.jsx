import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { getSearchImages } from './Api/getSearch';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

const App = () => {
  // const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getSearchImages(query, page);
        const newImages = response.hits.filter(
          newImage =>
            !images.some(existingImage => existingImage.id === newImage.id)
        );

        if (newImages.length === 0) {
          setEmpty(true); // Ustawiamy empty na true, jeśli nie ma nowych obrazów
          setTotal(page); // Ustawiamy total na aktualną stronę, aby zapobiec dalszemu ładowaniu
        } else {
          setImages(prevImages => [...prevImages, ...newImages]);
          setTotal(response.totalHits);
          setEmpty(false); // Ustawiamy empty na false, jeśli są nowe obrazy
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page, images]);

  const handleSubmit = query => {
    // setSearch(search);
    setQuery(query);
    setImages([]);
    setPage(1);
    setTotal(1);
    setLoading(false);
    setError(null);
    // setEmpty(false);
    setShowModal(false);
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

// import { useEffect } from 'react';
// import { getSearchImages } from './Api/getSearch';

// useEffect(() => {
//   if (search !== '' || page !== 1) {
//     getSearchImages(search, page)
//       .then(resp => resp.json())
//       .then(data => {
//         const newImages = data.hits.filter(
//           newImage =>
//             !images.some(existingImage => existingImage.id === newImage.id)
//         );
//         if (data.hits.length === 0) {
//           setEmpty(true);
//         }
//         setImages(prevImages => [...prevImages, ...newImages]);
//         setTotal(data.total);
//       })
//       .catch(error => setError(error.message))
//       .finally(() => setLoading(false));
//   }
// }, [search, page, images]);
