import axios from 'axios';
import { FormDataType, IArticles } from '../../types/articles';

export const newArticlePost = async (data: FormDataType, token: string | undefined): Promise<IArticles | undefined> => {
  try {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    const res = await axios.post('https://blog.kata.academy/api/articles', {
      article: { ...data },
    });
    return res.data.article;
  } catch (error) {}
};

export const editArticlePost = async (
  data: FormDataType,
  slug: string,
  token: string
): Promise<IArticles | undefined> => {
  try {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    const res = await axios.put(`https://blog.kata.academy/api/articles/${slug}`, {
      article: { ...data },
    });
    return res.data.article;
  } catch (error) {}
};
