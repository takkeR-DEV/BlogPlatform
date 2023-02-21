import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Spinner, Stack, Text } from '@chakra-ui/react';
import { FC, lazy, Suspense, useEffect, useState } from 'react';
import { Paginate } from 'react-paginate-chakra-ui';
import { useParams } from 'react-router-dom';
const PostList = lazy(() => import('../components/PostList/PostList'));
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchArticles } from '../store/action-creator/articles';

const PostPage: FC = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const handlePageClick = (p: number) => {
    setPage(p);
    dispatch(fetchArticles(p + 1));
  };
  const { articlesData, allPage, loading, error } = useAppSelector((state) => state.articlesReducer);

  useEffect(() => {
    dispatch(fetchArticles(1));
  }, [slug]);
  return (
    <Suspense
      fallback={
        <Stack direction="row" display="flex" justifyContent="center" mt="20px">
          <Spinner size="xl" color="blue.300" />
        </Stack>
      }
    >
      {!loading && articlesData.length && !error ? (
        <>
          <PostList articlesData={articlesData} />
          <Box display="flex" justifyContent="center">
            <Paginate
              size="sm"
              page={page}
              shadow="sm"
              fontWeight="bold"
              variant="outline"
              selectedVariant="solid"
              count={allPage}
              pageSize={5}
              colorScheme="blue"
              onPageChange={handlePageClick}
            />
          </Box>
        </>
      ) : (
        <Stack direction="row" display="flex" justifyContent="center" mt="20px">
          {error ? (
            <Alert
              status="error"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
              width="500px"
              m="0 auto"
              borderRadius={'6px'}
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Error
              </AlertTitle>
              <AlertDescription maxWidth="sm">An error has occurred contact the administrator</AlertDescription>
            </Alert>
          ) : (
            <Spinner size="xl" color="blue.300" />
          )}
        </Stack>
      )}
    </Suspense>
  );
};

export { PostPage };
