/* eslint-disable react/prop-types */
import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { IArticles } from '../../types/articles';
import Post from '../Post/Post';

const PostList: FC<IPostListProps> = ({ articlesData }) => {
  console.log('TS', articlesData);

  return (
    <Box maxW="942px" m="0 auto" display="flex" flexDirection="column" gap="26px">
      {articlesData.map((data) => (
        <Post key={data.slug} data={data} />
      ))}
    </Box>
  );
};

interface IPostListProps {
  articlesData: IArticles[];
}

export default PostList;
