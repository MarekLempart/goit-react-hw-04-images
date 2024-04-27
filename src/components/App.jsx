// App.js

import { Button } from 'components/Button/Button'; // Przycisk
import { Loader } from 'components/Loader/Loader'; // Wskaźnik ładowania
import { Component } from 'react';
import { Toaster } from 'react-hot-toast'; // Komponent do obsługi spływających powiadomień
import { getSearchImages } from './Api/getSearch'; // Funkcja do pobierania danych wyszukiwania
import { ImageGallery } from './ImageGallery/ImageGallery'; // Galeria obrazków
// import { Modal } from './Modal/Modal'; // Moda
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar'; // Pasek wyszukiwania
export class App extends Component {
  state = {
    search: '', // Aktualne zapytanie wyszukiwania
    images: [], // Lista obrazków
    page: 1, // Aktualna strona wyników
    total: 1, // Całkowita liczba obrazków pasujących do zapytania
    loading: false, // Flaga wskazująca czy trwa ładowanie danych
    error: null, // Błąd, jeśli wystąpił
    showModal: false, // Flaga określająca czy modal jest widoczny
    empty: false, // Flaga informująca czy lista obrazków jest pusta
    largeImageURL: '', //Duże obrazki do Modala
    alt: '',
  };

  componentDidUpdate(_, PrevState) {
    // Sprawdzenie czy zmieniły się parametry wyszukiwania lub strona
    if (
      PrevState.search !== this.state.search ||
      PrevState.page !== this.state.page
    ) {
      // Wywołanie funkcji do pobrania danych
      this.getFunc(this.state.search, this.state.page);
    }
  }

  // Funkcja do pobrania danych
  getFunc = (query, page) => {
    this.setState({ loading: true }); // Włączenie wskaźnika ładowania

    // Wywołanie funkcji getSearch, która wysyła zapytanie do serwera
    getSearchImages(query, page)
      .then(resp => resp.json()) // Konwersja odpowiedzi na format JSON
      .then(data => {
        const newImages = data.hits.filter(
          newImage =>
            !this.state.images.some(
              existingImage => existingImage.id === newImage.id
            )
        );
        // Sprawdzenie czy lista wyników wyszukiwania jest pusta
        if (data.hits.length === 0) {
          this.setState({ empty: true }); // Ustawienie flagi informującej o pustej liście
        }
        // Aktualizacja stanu aplikacji o nowe dane
        this.setState(prevState => ({
          page: prevState.page,
          // images: [...prevState.images, ...data.hits], // Dodanie nowych obrazków do listy
          images: [...prevState.images, ...newImages],
          total: data.total,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message }); // Obsługa błędu
      })
      .finally(() => {
        this.setState({ loading: false }); // Wyłączenie wskaźnika ładowania
      });
  };

  // Obsługa kliknięcia przycisku "Load more"
  clickLoad = () => {
    this.setState(prevState => ({
      page: prevState.page + 1, // Zwiększenie numeru strony o 1
    }));
  };

  // Obsługa otwierania modala
  openModal = (largeImageURL, alt) => {
    // Aktualizacja stanu aplikacji w zależności od poprzedniego stanu
    this.setState({
      showModal: true,
      largeImageURL,
      alt,
    });
  };

  // Obsługa przesłania formularza wyszukiwania
  handleSubmit = search => {
    // Wyczyszczenie listy obrazków i ustawienie wartości początkowych
    this.setState({
      search,
      images: [],
      page: 1,
      total: 1,
      loading: false,
      error: null,
      empty: false,
    });
  };

  // Obsługa zamknięcia modala
  closeModal = () => {
    // Aktualizacja stanu aplikacji w zależności od poprzedniego stanu
    this.setState({
      showModal: false,
      largeImageURL: '',
      alt: '',
    });
  };

  render() {
    const {
      error,
      loading,
      images,
      total,
      page,
      showModal,
      largeImageURL,
      alt,
    } = this.state;
    return (
      <div>
        {/* Komponent do obsługi spływających powiadomień */}
        <Toaster
          toastOptions={{
            duration: 1500,
          }}
        />

        {/* Pasek wyszukiwania */}
        <Searchbar handleSubmit={this.handleSubmit} />

        {/* Wyświetlenie komunikatu o błędzie */}
        {error && (
          <h2 style={{ textAlign: 'center' }}>
            Coś poszło nie tak: ({error})!
          </h2>
        )}

        {/* Galeria obrazków */}
        <ImageGallery toggleModal={this.openModal} images={images} />

        {/* Wskaźnik ładowania */}
        {loading && <Loader />}

        {/* Komunikat o pustej liście wyników */}
        {this.state.empty && (
          <h2 style={{ textAlign: 'center' }}>
            Przepraszamy. Brak obrazków ... 😭
          </h2>
        )}

        {/* Przycisk "Load more" */}
        {total / 12 > page && <Button clickLoad={this.clickLoad} />}

        <Modal
          showModal={showModal}
          closeModal={this.closeModal}
          largeImageURL={largeImageURL}
          alt={alt}
        />
      </div>
    );
  }
}

// import { Button } from 'components/Button/Button';
// import { Loader } from 'components/Loader/Loader';
// import { useEffect, useState } from 'react';
// import { Toaster } from 'react-hot-toast';
// import { getSearchImages } from './Api/getSearch';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import Modal from './Modal/Modal';
// import Searchbar from './Searchbar/Searchbar';

// const App = () => {
//   // const [search, setSearch] = useState('');
//   const [query, setQuery] = useState('');
//   const [images, setImages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [largeImageURL, setLargeImageURL] = useState('');
//   const [alt, setAlt] = useState('');
//   const [empty, setEmpty] = useState(false);

//   useEffect(() => {
//     if (!query) return;

//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await getSearchImages(query, page);
//         const newImages = response.hits.filter(
//           newImage =>
//             !images.some(existingImage => existingImage.id === newImage.id)
//         );

//         if (newImages.length === 0) {
//           setEmpty(true); // Ustawiamy empty na true, jeśli nie ma nowych obrazów
//           setTotal(page); // Ustawiamy total na aktualną stronę, aby zapobiec dalszemu ładowaniu
//         } else {
//           setImages(prevImages => [...prevImages, ...newImages]);
//           setTotal(response.totalHits);
//           setEmpty(false); // Ustawiamy empty na false, jeśli są nowe obrazy
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [query, page, images]);

//   const handleSubmit = query => {
//     // setSearch(search);
//     setQuery(query);
//     setImages([]);
//     setPage(1);
//     setTotal(1);
//     setLoading(false);
//     setError(null);
//     // setEmpty(false);
//     setShowModal(false);
//   };

//   const clickLoad = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   const openModal = (largeImageURL, alt) => {
//     setShowModal(true);
//     setLargeImageURL(largeImageURL);
//     setAlt(alt);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setLargeImageURL('');
//     setAlt('');
//   };

//   return (
//     <div>
//       <Toaster
//         toastOptions={{
//           duration: 1500,
//         }}
//       />
//       <Searchbar handleSubmit={handleSubmit} />
//       {error && (
//         <h2 style={{ textAlign: 'center' }}>Coś poszło nie tak: ({error})!</h2>
//       )}
//       <ImageGallery toggleModal={openModal} images={images} />
//       {loading && <Loader />}
//       {empty && (
//         <h2 style={{ textAlign: 'center' }}>
//           Przepraszamy. Brak obrazków ... 😭
//         </h2>
//       )}
//       {total / 12 > page && <Button clickLoad={clickLoad} />}
//       <Modal
//         showModal={showModal}
//         closeModal={closeModal}
//         largeImageURL={largeImageURL}
//         alt={alt}
//       />
//     </div>
//   );
// };

// export default App;

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
