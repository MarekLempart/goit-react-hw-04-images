// App.js

import { Button } from 'components/Button/Button'; // Przycisk
import { Loader } from 'components/Loader/Loader'; // Wskaźnik ładowania
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast'; // Komponent do obsługi spływających powiadomień
import { getSearchImages } from './Api/getSearch'; // Funkcja do pobierania danych wyszukiwania
import { ImageGallery } from './ImageGallery/ImageGallery'; // Galeria obrazków
import { Modal } from './Modal/Modal'; // Moda
import { Searchbar } from './Searchbar/Searchbar'; // Pasek wyszukiwania

export const App = () => {
  // const [search, setSearch] = useState(''); // Aktualne zapytanie wyszukiwania
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]); // Lista obrazków
  const [page, setPage] = useState(1); // Aktualna strona wyników
  const [total, setTotal] = useState(1); // Całkowita liczba obrazków pasujących do zapytania
  const [loading, setLoading] = useState(false); // Flaga wskazująca czy trwa ładowanie danych
  const [error, setError] = useState(null); // Błąd, jeśli wystąpi
  const [showModal, setShowModal] = useState(false); // Flaga określająca czy modal jest widoczny
  const [largeImageURL, setLargeImageURL] = useState(''); //Duże obrazki do Modal
  const [alt, setAlt] = useState('');
  const [empty, setEmpty] = useState(false); // Flaga informująca czy lista obrazków jest pusta

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getSearchImages(query, page);
        const data = await response.json(); // konwersja odpowiedzi na format JSON
        const newImages = data.hits.filter(
          newImage =>
            !images.some(existingImage => existingImage.id === newImage.id)
        );

        if (newImages.length === 0) {
          setEmpty(true); // Ustawiamy empty na true, jeśli nie ma nowych obrazów
          setTotal(page); // Ustawiamy total na aktualną stronę, aby zapobiec dalszemu ładowaniu
        } else {
          setImages(prevImages => [...prevImages, ...newImages]);
          setTotal(data.totalHits);
          setEmpty(false); // Ustawiamy empty na false, jeśli są nowe obrazy
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  // Obsługa przesłania formularza wyszukiwania
  const handleSubmit = search => {
    // Wyczyszczenie listy obrazków i ustawienie wartości początkowych
    // setSearch(search);
    setQuery(search);
    setImages([]);
    setPage(1);
    setTotal(1);
    setLoading(false);
    setError(null);
    setEmpty(false);
    setShowModal(false);
  };

  // Obsługa kliknięcia przycisku "Load more"
  const clickLoad = () => {
    if (images.length < total) {
      setPage(prevPage => prevPage + 1); // Zwiększenie numeru strony o 1
    }
  };

  // Obsługa otwierania modala
  const openModal = (largeImageURL, alt) => {
    // Aktualizacja stanu aplikacji w zależności od poprzedniego stanu
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setAlt(alt);
  };

  // Obsługa zamknięcia modala
  const closeModal = () => {
    // Aktualizacja stanu aplikacji w zależności od poprzedniego stanu
    setShowModal(false);
    setLargeImageURL('');
    setAlt('');
  };

  return (
    <div>
      {/* Komponent do obsługi spływających powiadomień */}
      <Toaster
        toastOptions={{
          duration: 1500,
        }}
      />

      {/* Pasek wyszukiwania */}
      <Searchbar handleSubmit={handleSubmit} />

      {/* Wyświetlenie komunikatu o błędzie */}
      {error && (
        <h2 style={{ textAlign: 'center' }}>Coś poszło nie tak: ({error})!</h2>
      )}

      {/* Galeria obrazków */}
      <ImageGallery toggleModal={openModal} images={images} />

      {/* Wskaźnik ładowania */}
      {loading && <Loader />}

      {/* Komunikat o pustej liście wyników */}
      {!loading && !error && empty && (
        <h2 style={{ textAlign: 'center' }}>
          Przepraszamy. Brak obrazków ... 😭
        </h2>
      )}

      {/* Przycisk "Load more" */}
      {!loading && !error && !empty && query && images.length < total && (
        <Button clickLoad={clickLoad} />
      )}

      <Modal
        showModal={showModal}
        closeModal={closeModal}
        largeImageURL={largeImageURL}
        alt={alt}
      />
    </div>
  );
};
