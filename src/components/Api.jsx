import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38382218-99536ad77025498ca3a521a1b';

export const fetchImages = async ({ request, page }) => {
  const response = await axios.get(
    `/?q=${request.slice(
      request.indexOf('/') + 1,
      request.length
    )}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
