import { Box, Button, Link, Text, Image, IconButton, Tag } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import React, { FC, useState } from 'react';
import pc from './Post.module.scss';
import { useParams, Link as ReachLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import ModalDelete from '../ModalDelete/ModalDelete';

const count = () => {
  let id = 0;
  return () => {
    return id++;
  };
};
const id = count();

const Post: FC<any> = ({ data, checkSlug, showmore }) => {
  const { user, logined } = useAppSelector((state) => state.authReducer);
  console.log('gggggggggggg', data);

  const [active, setActive] = useState(false);
  const [count, setCount] = useState(data.favoritesCount);
  const { slug } = useParams();
  console.log('>>>>>>>>>>>>>>>>>', slug);

  const btn = () => {
    setActive(() => !active);
    setCount(() => (active ? count - 1 : count + 1));
  };
  return (
    <Box bg="white" maxW="942px" h="127px" maxH="140px" p="19px" w="941px">
      <Box display="flex" justifyContent="space-between">
        <Box mb="10px">
          <Box display="flex">
            <Link
              as={ReachLink}
              mr="5px"
              color="#1890FF"
              maxW="250px"
              maxH="20px"
              overflow="hidden"
              to={`/articles/${checkSlug ? checkSlug : data.slug}`}
            >
              {data.title}
            </Link>
            {active ? (
              <IconButton
                colorScheme="red"
                aria-label="Like"
                size="16px"
                variant="ghost"
                icon={<AiFillHeart />}
                onClick={() => btn()}
              />
            ) : (
              <IconButton
                aria-label="Like"
                size="16px"
                variant="ghost"
                icon={<AiOutlineHeart />}
                onClick={() => btn()}
              />
            )}
            <span>{count}</span>
          </Box>
          <Box maxW="550px" maxH="25px" overflow="hidden">
            {data.tagList.map((tag: string, index: number) => {
              if (!index)
                return (
                  <Tag variant="outline" colorScheme="gray" key={id()} mr="5px">
                    {tag}
                  </Tag>
                );
              return (
                <Tag colorScheme="gray" key={id()} variant="outline" opacity="0.7" mr="5px">
                  {tag}
                </Tag>
              );
            })}
          </Box>
        </Box>
        <Box display="flex">
          <Box mr="10px">
            <Text>{data.author.username}</Text>
            <Text fontSize="12px" color="gray">
              {new Date(data.createdAt).toDateString()}
            </Text>
          </Box>
          <Image borderRadius="full" boxSize="46px" src={data.author.image} alt="Аватар" />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="12px" display="inline-block" w="682px" maxH="35px" overflow="hidden">
          {data.description}
        </Text>
        <Box display="flex" gap="10px">
          {data.author.username === user.username && logined && showmore ? (
            <>
              <ModalDelete slug={data.slug} token={user.token} />
              <Button colorScheme="green" variant="outline" w="65px" h="31px">
                Edit
              </Button>
            </>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Post;

//<Box bg="white" w="942px" h="140px" display="flex" mt="26px" justifyContent="center"></Box>;
