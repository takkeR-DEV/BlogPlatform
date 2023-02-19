import { Box, Button, Heading, Input, ListItem, Text, Textarea, UnorderedList, useToast } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { editArticlePost, newArticlePost } from '../../service/api/apiArticles';
import { getPostSlug } from '../../service/api/apiPostSlug';
import newArticle from './CreateArticle.module.scss';

let maxId = 1;

const CreateArticle: FC = () => {
  const { logined } = useAppSelector((state) => state.authReducer);

  const { slug } = useParams();
  const [dataTitle, setDataTitle] = useState<string>('');
  const [dataDesc, setDataDesc] = useState<string>('');
  const [dataBody, setDataBody] = useState<string>('');
  const [loading, setLoading] = useState<any>(false);
  const [tag, setTag] = useState<any[]>([]);
  const [inputState, setInputState] = useState<any>('');
  const [errorTags, setErrorTags] = useState(false);
  const toast = useToast();

  useEffect(() => {
    clearState();
    if (slug) {
      setLoading(true);
      getPostSlug(slug).then((el) => {
        setLoading(false);
        setDataState(el);
      });
    }
  }, [slug]);

  const clearState = () => {
    reset();
    setTag([]);
  };

  const setDataState = (el: any) => {
    setValue('title', el.data.article.title);
    setValue('description', el.data.article.description);
    setValue('body', el.data.article.body);
    setTag(
      el.data.article.tagList.map((elem: any) => {
        return { v: elem, id: maxId++ };
      })
    );
  };

  const navigate = useNavigate();
  useEffect(() => {
    !logined ? navigate('/sign-in') : null;
  }, [logined]);
  const dispatch = useAppDispatch();

  const test = (data: any) => {
    const { body, description, title, ...tags } = data;

    const allTags: any[] = Object.entries(tags).map((el) => el[1]);
    const tagList = allTags.filter((el) => el.trim() !== '');
    const newData = { body, description, title, tagList };

    if (!slug) {
      newArticlePost(newData).then((data) => {
        navigate(`/articles/${data.slug}`);
        toast({
          position: 'bottom-right',
          colorScheme: 'green',
          status: 'success',
          title: 'Successfully',
          description: 'You have successfully created a post',
        });
      });
    } else {
      editArticlePost(newData, slug).then((data) => {
        navigate(`/articles/${data.slug}`);
        toast({
          position: 'bottom-right',
          colorScheme: 'green',
          status: 'success',
          title: 'Successfully',
          description: 'You have successfully edit a post',
        });
      });
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    unregister,
    getValues,
    setValue,
    reset,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const addTag = () => {
    unregister('tags0');
    if (inputState.trim()) {
      setErrorTags(false);
      setTag([...tag, { v: inputState.trim(), id: maxId++ }]);
      setInputState('');
    } else {
      setErrorTags(true);
    }
  };

  const delTag = (elt: string) => {
    setTag((tag) => tag.filter((el) => el.id !== elt));
    unregister(`tags${elt}`);
  };

  return (
    <Box
      w={938}
      minH={701}
      bg={'white'}
      m={'0 auto'}
      display="flex"
      flexDirection={'column'}
      alignItems="center"
      gap="21px"
    >
      <Heading fontSize={'20px'} lineHeight={'28px'} mt={'48px'}>
        {slug ? 'Edit article' : 'Create new article'}
      </Heading>
      <form className={newArticle.formarticle} onSubmit={handleSubmit(test)}>
        <label>
          <Text fontSize={'14px'}>Title</Text>
          <Input
            w={'874px'}
            h={'40px'}
            {...register('title', {
              value: dataTitle,
              required: 'This field should not be empty',
              minLength: {
                value: 3,
                message: 'Minimum 3 characters',
              },
              maxLength: {
                value: 60,
                message: 'Maximum 60 characters',
              },
            })}
            placeholder="Title"
          />
          <Text fontSize={'14px'} color="red">
            {errors?.title && <>{errors?.title?.message || 'Error'}</>}{' '}
          </Text>
        </label>
        <label>
          <Text fontSize={'14px'}>Short description</Text>
          <Input
            focusBorderColor={errors?.email ? 'red.400' : 'black'}
            w={'874px'}
            h={'40px'}
            placeholder="Title"
            {...register('description', {
              value: dataDesc,
              required: 'This field should not be empty',
              minLength: {
                value: 3,
                message: 'Minimum 3 characters',
              },
              maxLength: {
                value: 60,
                message: 'Maximum 60 characters',
              },
            })}
          />
          <Text fontSize={'14px'} color="red">
            {errors?.description && <>{errors?.description?.message || 'Error'}</>}{' '}
          </Text>
        </label>
        <label>
          <Text fontSize={'14px'}>Text</Text>
          <Textarea
            w={'874px'}
            h={'168px'}
            placeholder="Text"
            {...register('body', {
              value: dataBody,
              required: 'This field should not be empty',
              minLength: {
                value: 3,
                message: 'Minimum 3 characters',
              },
            })}
          />
          <Text fontSize={'14px'} color="red">
            {errors?.body && <>{errors?.body?.message || 'Error'}</>}{' '}
          </Text>
        </label>
        <label>
          <Text fontSize={'14px'}>tags</Text>
          <UnorderedList m={0}>
            {tag.map((el) => (
              <ListItem key={el.id} display={'flex'}>
                <Input
                  focusBorderColor={errors?.email ? 'red.400' : 'black'}
                  mb="5px"
                  w={'300px'}
                  h={'40px'}
                  placeholder="Title"
                  {...register(`tags${el.id}`, {
                    value: el.v,
                    required: 'This field should not be empty',
                  })}
                />
                <Button m="0 10px" variant={'outline'} colorScheme="red" onClick={() => delTag(el.id)}>
                  DELETE
                </Button>
              </ListItem>
            ))}

            <Box display={'flex'}>
              <Input
                w={'300px'}
                h={'40px'}
                value={inputState}
                placeholder="Title"
                {...register('tags0', {
                  onChange: (e) => {
                    setInputState(e.target.value);
                    setErrorTags(false);
                  },
                })}
              />

              <Button
                m={'0 10px'}
                variant={'outline'}
                colorScheme="red"
                onClick={() => {
                  setInputState('');
                  unregister('tags0');
                }}
              >
                DELETE
              </Button>
              <Button variant={'outline'} colorScheme="blue" onClick={() => addTag()}>
                ADD
              </Button>
            </Box>
          </UnorderedList>
          {errorTags ? <Text color="red">This field should not be empty</Text> : null}
        </label>
        <Button colorScheme="blue" mt="12px" type="submit" w="319px" h="40px" mb="8px">
          Send
        </Button>
      </form>
    </Box>
  );
};

export default CreateArticle;
