/* eslint-disable react/no-children-prop */
import { Box, Spinner, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post/Post';
import { getPostSlug } from '../service/api/apiPostSlug';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

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
            <Box
              display="flex"
              flexDirection="column"
              w="941px"
              bg="white"
              boxSizing="content-box"
              m="0 auto 30px auto"
              p="20px"
            >
              <Post data={data} checkSlug={slug} showmore={true} />
              {/* <Text m="0 20px 20px 20px">{data.body}</Text> */}
              <ReactMarkdown components={ChakraUIRenderer()} children={data.body} skipHtml />
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
