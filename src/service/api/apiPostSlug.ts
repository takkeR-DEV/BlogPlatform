import axios from 'axios';

export const getPostSlug = async (slug: string | undefined): Promise<any> => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  return await axios.get(`https://blog.kata.academy/api/articles/${slug}`);
};
