import axios from 'axios';

const API_KEY = '36750507-21f23312de1f08bfaa38e5a02';
const PER_PAGE = 12;

export const getImages = async (query, page) => {
  const { data } = await axios(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  );
  return data;
};
