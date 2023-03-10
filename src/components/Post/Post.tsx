import { Box, Button, Link, Text, Image, IconButton, Tag } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FC, useEffect, useState } from 'react';
import { useParams, Link as ReachLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import ModalDelete from '../ModalDelete/ModalDelete';
import { delFavorite, postFavorite } from '../../service/api/apiFavorites';
import { IArticles } from '../../types/articles';

const count = () => {
  let id = 0;
  return () => {
    return id++;
  };
};
const id = count();

interface PostType {
  data: IArticles;
  checkSlug?: string;
  showmore?: boolean;
}

const Post: FC<PostType> = ({ data, checkSlug, showmore }) => {
  const navigate = useNavigate();
  const { user, logined, token } = useAppSelector((state) => state.authReducer);

  const [active, setActive] = useState(data.favorited);
  const [count, setCount] = useState(data.favoritesCount);

  useEffect(() => {
    if (logined) {
      setActive(data.favorited);
    }
  }, [data]);

  const btn = () => {
    setActive((active) => !active);
    setCount(() => (active ? count - 1 : count + 1));
    !active ? postFavorite(data.slug, user.token) : delFavorite(data.slug, user.token);
  };
  return (
    <Box bg="white" maxW="942px" h="127px" maxH="140px" p="19px" w="941px" boxShadow={!showmore ? 'lg' : 'none'}>
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
            {active && logined ? (
              <IconButton
                mr="3px"
                isDisabled={!logined}
                colorScheme="red"
                aria-label="Like"
                size="16px"
                variant="ghost"
                icon={<AiFillHeart />}
                onClick={() => btn()}
              />
            ) : (
              <IconButton
                mr="3px"
                isDisabled={!logined}
                aria-label="Like"
                size="16px"
                variant="ghost"
                icon={<AiOutlineHeart />}
                onClick={() => btn()}
              />
            )}
            <span>{count}</span>
          </Box>
          <Box maxW="550px" maxH="30px" overflow="hidden">
            {data.tagList.map((tag: string, index: number) => {
              if (!index)
                return (
                  <Tag variant="outline" colorScheme="gray" key={id()} mr="5px" mt="5px">
                    {tag}
                  </Tag>
                );
              return (
                <Tag colorScheme="gray" key={id()} variant="outline" opacity="0.7" mr="5px" mt="5px">
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
          <Image borderRadius="full" boxSize="46px" src={data.author.image} alt="????????????" />
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
              <Button
                colorScheme="green"
                variant="outline"
                w="65px"
                h="31px"
                onClick={() => navigate(`/articles/${data.slug}/edit`)}
              >
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
