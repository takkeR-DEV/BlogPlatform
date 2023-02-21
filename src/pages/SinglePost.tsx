/* eslint-disable react/no-children-prop */
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Spinner, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post/Post';
import { getPostSlug } from '../service/api/apiPostSlug';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { IArticles } from '../types/articles';
import { useAppSelector } from '../hooks/redux';

const SinglePost = () => {
  const errorObject = { message: '', code: '', name: '' };
  const { user, token, logined } = useAppSelector((state) => state.authReducer);
  const { slug } = useParams();
  const [data, setData] = useState<IArticles | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorObjectType>(errorObject);

  useEffect(() => {
    setError({ message: '', code: '', name: '' });
    setLoading(true);
    getPostSlug(slug)
      .then((el) => {
        setLoading(false);
        setData(el);
      })
      .catch((e) => {
        setLoading(false);
        setError({ message: e.message, code: e.code, name: e.name });
      });
  }, [logined]);

  useEffect(() => {
    if (logined) {
      setError({ message: '', code: '', name: '' });
      setLoading(true);
      getPostSlug(slug)
        .then((el) => {
          setLoading(false);
          setData(el);
        })
        .catch((e) => {
          setLoading(false);
          setError({ message: e.message, code: e.code, name: e.name });
        });
    }
  }, [logined]);

  return (
    <>
      {!loading && !error.code ? (
        <>
          {data ? (
            <Box
              display="flex"
              flexDirection="column"
              w="941px"
              bg="white"
              boxSizing="content-box"
              m="0 auto 30px auto"
              boxShadow="lg"
            >
              <Post data={data} checkSlug={slug} showmore={true} />
              <Box p="0 20px 20px 20px">
                <ReactMarkdown components={ChakraUIRenderer()} children={data.body} skipHtml />
              </Box>
            </Box>
          ) : null}
        </>
      ) : (
        <Stack direction="row" display="flex" justifyContent="center" mt="20px">
          {loading ? <Spinner size="xl" color="blue.300" /> : null}
          {error.code ? (
            <Alert
              status="error"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
              width="300px"
              m="0 auto"
              borderRadius={'6px'}
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                {error.name}
              </AlertTitle>
              <AlertTitle mt={2} mb={1} fontSize="lg">
                {error.code}
              </AlertTitle>
              <AlertDescription maxWidth="sm">{error.message}</AlertDescription>
            </Alert>
          ) : null}
        </Stack>
      )}
    </>
  );
};

interface ErrorObjectType {
  message: string;
  code: string;
  name: string;
}

export { SinglePost };
