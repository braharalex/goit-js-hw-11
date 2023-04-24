const axios = require('axios/dist/browser/axios.cjs');
const API_KEY = '35699818-7bf3cd0bc40977ff0d0bc0ac5';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: API_KEY,
  },
});

export default async function (queryParams, page, perPage) {
  const params = {
    q: queryParams,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: perPage,
  };
  try {
    return await instance.get('', { params });
  } catch (err) {
    throw err;
  }
}
