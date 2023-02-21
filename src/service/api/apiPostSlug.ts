import axios, { AxiosResponse } from 'axios';
import { useAppSelector } from '../../hooks/redux';
import { IArticles } from '../../types/articles';

//token: string | undefined

export const getPostSlug = async (slug: string | undefined): Promise<IArticles> => {
  try {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    const res = await axios.get(`https://blog.kata.academy/api/articles/${slug}`);

    return res.data.article;
  } catch (error: any) {
    console.log('упал в ошибку ');

    throw error;
  }
};
