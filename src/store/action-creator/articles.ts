import axios from 'axios';
import { AppDispatch } from '..';
import { IArticles } from '../../types/articles';
import { articlesSlice } from '../reducers/articesReducer';

//get Aricles
export const fetchArticles = (page: number) => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    dispatch(articlesSlice.actions.articlesFetch());
    const res = await axios.get<any>(`https://blog.kata.academy/api/articles?&limit=5&offset=${(page - 1) * 5}`);

    dispatch(articlesSlice.actions.articlesFetchSuccess(res.data));
  } catch (error: any) {
    dispatch(articlesSlice.actions.articlesFetchError(error.message));
  }
};

// Delete Article

export const deleteArticle = (slug: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    console.log('2222222222222222', slug, token);

    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    const res = await axios.delete<any>(`https://blog.kata.academy/api/articles/${slug}`);
    console.log('hhhhhhhhhhhhhhhhhhhhh', res);
  } catch (error: any) {}
};

//Edit Article

export const editArticle = (slug: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.put<any>(`https://blog.kata.academy/api/${slug}`);
  } catch (error: any) {}
};
