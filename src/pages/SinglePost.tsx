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
            <Box display="flex" alignItems="center" flexDirection="column" w="941px" maxH="870px" bg="white" m="0 auto">
              <Post data={data} checkSlug={slug} showmore={true} />
              <Text m="0 20px 20px 20px">
                {data.body}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro iste veritatis vero tempora consequatur
                quibusdam, fugit fugiat labore, quae, molestias hic omnis provident odit fuga molestiae officiis cumque
                numquam voluptas? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime eveniet, quia pariatur
                accusamus, omnis dolor voluptate sapiente autem commodi dolores aliquam maiores obcaecati aut,
                dignissimos recusandae voluptatem cupiditate repudiandae. Dolore. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Ipsa tempore explicabo omnis nemo? Id nihil provident ex mollitia! Aspernatur
                laudantium eum architecto distinctio repudiandae similique non doloribus itaque, a molestias? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Vel officiis recusandae exercitationem doloremque
                nihil earum ipsa, iure repellendus porro dolores nisi aut, itaque magnam vero quia tempore sed excepturi
                iste.
              </Text>
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
