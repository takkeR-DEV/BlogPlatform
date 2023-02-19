import axios from 'axios';

export const newArticlePost = async (data: any): Promise<any> => {
  try {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    const res = await axios.post('https://blog.kata.academy/api/articles', {
      article: { ...data },
    });
    return res.data.article;
  } catch (error) {}
};

export const editArticlePost = async (data: any, slug: string): Promise<any> => {
  try {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    const res = await axios.put(`https://blog.kata.academy/api/articles/${slug}`, {
      article: { ...data },
    });
    return res.data.article;
  } catch (error) {}
};
