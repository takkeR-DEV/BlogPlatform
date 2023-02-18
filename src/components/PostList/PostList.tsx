import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import { IArticles } from '../../types/articles';
import { Routes, Route, Link } from 'react-router-dom';
import Post from '../Post/Post';

const PostList: FC<any> = ({ articlesData }) => {
  return (
    <Box maxW="942px" m="0 auto" display="flex" flexDirection="column" gap="26px">
      {articlesData.map((data: any) => (
        <Post key={data.slug} data={data} />
      ))}
    </Box>
  );
};

export default PostList;
