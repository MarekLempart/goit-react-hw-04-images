import { useEffect } from 'react';
import { getSearchImages } from './Api/getSearch';

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
