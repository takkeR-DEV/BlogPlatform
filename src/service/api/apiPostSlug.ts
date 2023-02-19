import axios from 'axios';

export const getPostSlug = async (slug: any): Promise<any> => {
  return await axios.get(`https://blog.kata.academy/api/articles/${slug}`);
};
