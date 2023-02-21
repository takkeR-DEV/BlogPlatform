import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

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
import RequireAuth from '../../hoc/RequireAuth';

function App() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(fetchArticles(1, token));
    dispatch(authSession());
  }, [token]);

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
          <Route
            path="/new-article/"
            element={
              <RequireAuth>
                <CreateArticle />
              </RequireAuth>
            }
          />
          <Route path="/articles/:slug/edit" element={<CreateArticle />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
