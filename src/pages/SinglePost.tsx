import { Box, Spinner, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post/Post';
import { getPostSlug } from '../service/api/apiPostSlug';

const SinglePost = () => {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    setLoading(true);
    getPostSlug(slug).then((el) => {
      setLoading(false);
      setData(el.data.article);
    });
  }, [slug]);
  console.log(data);

  return (
    <>
      {!loading ? (
        <>
          {data ? (
            <Box display="flex" flexDirection="column" w="941px" maxH="870px" bg="white" m="0 auto">
              <Post data={data} checkSlug={slug} showmore={true} />
              <Text m="0 20px 20px 20px">{data.body}</Text>
            </Box>
          ) : null}
        </>
      ) : (
        <Stack direction="row" display="flex" justifyContent="center" mt="20px">
          <Spinner size="xl" color="blue.300" />
        </Stack>
      )}
    </>
  );
};

export { SinglePost };
