import axios from 'axios';

export const postFavorite = async (slug: string, token: any): Promise<any> => {
  try {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    const res = await axios.post(`https://blog.kata.academy/api/articles/${slug}/favorite`);
    console.log('>>>>>', res.data);
  } catch (error) {
    console.log(error);
  }
};

export const delFavorite = async (slug: string, token: any): Promise<any> => {
  try {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    const res = await axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`);
    console.log('>>>>>', res.data);
  } catch (error) {
    console.log(error);
  }
};
