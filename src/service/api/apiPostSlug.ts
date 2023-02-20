import axios from 'axios';

export const getPostSlug = async (slug: string | undefined, token: string | undefined): Promise<any> => {
  try {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    const res = await axios.get(`https://blog.kata.academy/api/articles/${slug}`);

    return res.data.article;
  } catch (error) {}
};
