import { Box, Spinner, Stack } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Paginate } from 'react-paginate-chakra-ui';
import PostList from '../components/PostList/PostList';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchArticles } from '../store/action-creator/articles';

// interface PropsPostPage {
//   page: number;
//   handlePageClick: (p: number) => void;
// }

const PostPage: FC = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const handlePageClick = (p: number) => {
    console.log(p);
    setPage(p);
    dispatch(fetchArticles(p + 1));
  };
  const { articlesData, allPage, loading, error } = useAppSelector((state) => state.articlesReducer);
  return (
    <>
      {!loading ? (
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
    </>
  );
};

export { PostPage };

// (
//   <>
//     <Stack direction="row" display="flex" justifyContent="center" mt="20px">
//       <Spinner size="xl" color="blue.300" />
//     </Stack>
//   </>
// ) : (
//   <Box display="flex" justifyContent="center" mt="20px">
//     <Alert status="error" w="260px">
//       <AlertIcon />
//       <AlertTitle>Error!</AlertTitle>
//       <AlertDescription>Failed to load posts.</AlertDescription>
//     </Alert>
//   </Box>
// )
