import { Box, Spinner, Stack } from '@chakra-ui/react';
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
    if (slug) dispatch(fetchArticles(1));
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
          <Spinner size="xl" color="blue.300" />
        </Stack>
      )}
    </Suspense>
  );
};

export { PostPage };
