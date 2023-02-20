import axios from 'axios';

export const postFavorite = async (slug: string | undefined, token: string | undefined): Promise<void> => {
  try {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    await axios.post(`https://blog.kata.academy/api/articles/${slug}/favorite`);
  } catch (error) {}
};

export const delFavorite = async (slug: string | undefined, token: string | undefined): Promise<void> => {
  try {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    await axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`);
  } catch (error) {}
};
