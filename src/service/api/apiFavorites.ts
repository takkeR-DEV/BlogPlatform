import axios from 'axios';

export const postFavorite = async (slug: string, token: any): Promise<any> => {
  try {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    await axios.post(`https://blog.kata.academy/api/articles/${slug}/favorite`);
  } catch (error) {}
};

export const delFavorite = async (slug: string, token: any): Promise<any> => {
  try {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    await axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`);
  } catch (error) {}
};
