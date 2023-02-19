import axios from 'axios';

export const getPostSlug = async (slug: string | undefined, token: string | undefined): Promise<any> => {
  axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  const res = await axios.get(`https://blog.kata.academy/api/articles/${slug}`);
  console.log('fff', res.data.article);

  return res.data.article;
};
