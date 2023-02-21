import axios, { AxiosError } from 'axios';
import { AppDispatch } from '..';
import { IArticles } from '../../types/articles';
import { articlesSlice } from '../reducers/articesReducer';

//get Aricles
export const fetchArticles = (page: number, token: string | undefined) => async (dispatch: AppDispatch) => {
  try {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    dispatch(articlesSlice.actions.articlesFetch());
    const res = await axios.get(`https://blog.kata.academy/api/articles?&limit=5&offset=${(page - 1) * 5}`);
    if (res.status === 200) {
      dispatch(articlesSlice.actions.articlesFetchSuccess(res.data));
    } else {
      throw new Error('Ошибка');
    }
  } catch (error: any) {
    dispatch(articlesSlice.actions.articlesFetchError(error.message));
  }
};

// Delete Article

export const deleteArticle = (slug: string, token: string | undefined) => async (dispatch: AppDispatch) => {
  try {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    await axios.delete(`https://blog.kata.academy/api/articles/${slug}`);
  } catch (error: any) {}
};

//Edit Article

// export const editArticle = (slug: string) => async (dispatch: AppDispatch) => {
//   try {
//     await axios.put(`https://blog.kata.academy/api/${slug}`);
//   } catch (error: any) {}
// };
