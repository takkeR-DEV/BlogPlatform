import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticles } from '../../types/articles';

interface ArticlesStateType {
  articlesData: IArticles[];
  allPage: number;
  loading: boolean;
  error: string;
}

const initialState: ArticlesStateType = {
  articlesData: [],
  allPage: 0,
  loading: false,
  error: '',
};
export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    articlesFetch(state) {
      state.loading = true;
    },
    articlesFetchSuccess(state, action: PayloadAction<SuccessArticlesType>) {
      state.loading = false;
      state.error = '';
      state.articlesData = action.payload.articles;
      state.allPage = action.payload.articlesCount;
    },
    articlesFetchError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

interface SuccessArticlesType {
  articles: IArticles[];
  articlesCount: number;
}

export default articlesSlice.reducer;
