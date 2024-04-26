// getSearch.js

const API_KEY = '42451517-7ac5a5d17c420ae469b144174';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

export const getSearchImages = (query, page) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: PER_PAGE,
  });

  return fetch(`${BASE_URL}?${params}`);
};
