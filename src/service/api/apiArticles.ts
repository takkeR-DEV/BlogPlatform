import axios from 'axios';

export const newArticlePost = async (data: any): Promise<any> => {
  try {
    console.log('я тут', data);
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    const res = await axios.post('https://blog.kata.academy/api/articles', {
      article: { ...data },
    });
    return res.data.article;
  } catch (error) {
    console.log(error);
  }

  // return await axios.get(`https://blog.kata.academy/api/articles/${slug}`);
  // console.log(res);
};
