// getSearch.js

// import axios from 'axios';
// const getSearchImages = async (query, page) => {
//   const response = await axios.get(`https://pixabay.com/api/`, {
//     method: 'get',
//     params: {
//       key: '33717102-715c10c4f2cae8a60768f134f',
//       q: query,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       per_page: 12,
//       page: page,
//     },
//   });

//   return response.data;
// };
// export default getSearchImages;

// import axios from 'axios';
// const API_KEY = '42451517-7ac5a5d17c420ae469b144174';
// const BASE_URL = 'https://pixabay.com/api/';
// const PER_PAGE = 12;

// export const getSearchImages = async (query, page) => {
//   const response = await axios.get(BASE_URL, {
//     method: 'get',
//     params: {
//       key: API_KEY,
//       q: query,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       page: page,
//       per_page: PER_PAGE,
//     },
//   });
//   return response.data;
// };

const API_KEY = '42451517-7ac5a5d17c420ae469b144174';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

export const getSearchImages = async (query, page) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: PER_PAGE,
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
