import axios, { AxiosError } from 'axios';
import { AppDispatch } from '..';
import { IArticles } from '../../types/articles';
import { articlesSlice } from '../reducers/articesReducer';

//get Aricles
export const fetchArticles = (page: number) => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    dispatch(articlesSlice.actions.articlesFetch());
    const res = await axios.get(`https://blog.kata.academy/api/articles?&limit=5&offset=${(page - 1) * 5}`);

    dispatch(articlesSlice.actions.articlesFetchSuccess(res.data));
  } catch (error: any) {
    dispatch(articlesSlice.actions.articlesFetchError(error.message));
  }
};

// Delete Article

export const deleteArticle = (slug: string, token: string | undefined) => async (dispatch: AppDispatch) => {
  try {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    const res = await axios.delete(`https://blog.kata.academy/api/articles/${slug}`);
  } catch (error: any) {}
};

//Edit Article

export const editArticle = (slug: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.put(`https://blog.kata.academy/api/${slug}`);
  } catch (error: any) {}
};
