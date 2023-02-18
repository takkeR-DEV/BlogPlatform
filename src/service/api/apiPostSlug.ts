import axios from 'axios';

export const getPostSlug = async (slug: any): Promise<any> => {
  console.log('я тут');

  return await axios.get(`https://blog.kata.academy/api/articles/${slug}`);
  // console.log(res);
};
