import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { articlesSlice } from '../../store/reducers/articesReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchArticles } from '../../store/action-creator/articles';

import Layout from '../Layout/Layout';
import { SinglePost } from '../../pages/SinglePost';
import { PostPage } from '../../pages/PostPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import EditProfile from '../EditProfile/EditProfile';
import { authSession } from '../../store/action-creator/auth';
import CreateArticle from '../CreateArticle/CreateArticle';

function App() {
  // const { loading } = useAppSelector((state) => state.articlesReducer);
  // const { logined } = useAppSelector((state) => state.authReducer);

  console.log('12egwegewgewgewg>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  const {} = articlesSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticles(1));
    dispatch(authSession());
  }, []);

  // const [page, setPage] = React.useState(0);
  // const handlePageClick = (p: number) => {
  //   console.log(p);
  //   setPage(p);
  //   dispatch(fetchArticles(p + 1));
  // };

  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostPage />} />
          <Route path="/articles/" element={<PostPage />} />
          <Route path="/articles/:slug" element={<SinglePost />} />
          <Route path="/sign-up/" element={<Register />} />
          <Route path="/sign-in/" element={<Login />} />
          <Route path="/profile/" element={<EditProfile />} />
          <Route path="/new-article/" element={<CreateArticle />} />
          <Route path="/articles/:slug/edit" element={<CreateArticle />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
