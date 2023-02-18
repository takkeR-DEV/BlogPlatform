import { Box, Button, Heading, Input, Text, Textarea } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import newArticle from './CreateArticle.module.scss';

let maxId = 1;

const CreateArticle: FC = () => {
  const { logined, user } = useAppSelector((state) => state.authReducer);

  const [tag, setTag] = useState<any[]>([]);
  const [inputState, setInputState] = useState<any>('');

  console.log(inputState);

  const navigate = useNavigate();
  useEffect(() => {
    !logined ? navigate('/sign-in') : null;
  }, [logined]);
  const dispatch = useAppDispatch();

  const test = (data: any) => {
    // setInputState('');
    console.log(data);
    console.log('fffffffffff', inputState);
    const { body, description, title, ...tags } = data;
    // dispatch(authRegister(data));
    const allTags = Object.entries(tags).map((el) => el[1]);
    const tagList = allTags.filter((el: any) => el.trim() !== '');
    const newData = { body, description, title, tagList };

    console.log(newData);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    unregister,
    getValues,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const addTag = () => {
    unregister('tags0');
    if (inputState.trim()) {
      setTag([...tag, { v: inputState.trim(), id: maxId++ }]);
      setInputState('');
      console.log(inputState.trim());
    }
  };

  const delTag = (elt: string) => {
    setTag((tag) => tag.filter((el) => el.id !== elt));
    unregister(`tags${elt}`);
    console.log(tag, elt);
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
        Create new article
      </Heading>
      <form className={newArticle.formarticle} onSubmit={handleSubmit(test)}>
        <label>
          <Text fontSize={'14px'}>Title</Text>
          <Input
            w={'874px'}
            h={'40px'}
            {...register('title', {
              required: 'This field should not be empty',
              minLength: {
                value: 3,
                message: 'min 3',
              },
              maxLength: {
                value: 20,
                message: 'max 20',
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
              required: 'This field should not be empty',
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
              required: 'This field should not be empty',
              minLength: {
                value: 6,
                message: 'min 6',
              },
              maxLength: {
                value: 40,
                message: 'max 20',
              },
            })}
          />
          <Text fontSize={'14px'} color="red">
            {errors?.body && <>{errors?.body?.message || 'Error'}</>}{' '}
          </Text>
        </label>
        <label>
          <Text fontSize={'14px'}>tags</Text>
          <>
            {tag.map((el) => (
              <div key={el.id}>
                <Input
                  focusBorderColor={errors?.email ? 'red.400' : 'black'}
                  w={'300px'}
                  h={'40px'}
                  placeholder="Title"
                  {...register(`tags${el.id}`, {
                    value: el.v,
                    required: 'This field should not be empty',
                  })}
                />
                <Button m="5" onClick={() => delTag(el.id)}>
                  DELETE
                </Button>
                <Text fontSize={'14px'} color="red">
                  {errors?.tags && <>{errors?.tags?.message || 'Error'}</>}{' '}
                </Text>
              </div>
            ))}
          </>
          <Input
            focusBorderColor={errors?.email ? 'red.400' : 'black'}
            w={'300px'}
            h={'40px'}
            value={inputState}
            placeholder="Title"
            {...register('tags0', {
              onChange: (e) => {
                setInputState(e.target.value);
              },
              // setValueAs: (v) => setInputState(v),
            })}
          />
          <Button
            m="5"
            onClick={() => {
              setInputState('');
              unregister('tags0');
            }}
          >
            DELETE
          </Button>
          <Button onClick={() => addTag()}>ADD</Button>
          <Text fontSize={'14px'} color="red">
            {errors?.description && <>{errors?.description?.message || 'Error'}</>}{' '}
          </Text>
        </label>
        <Button colorScheme="blue" mt="12px" type="submit" w="319px" h="40px" mb="8px">
          Send
        </Button>
      </form>
    </Box>
  );
};

export default CreateArticle;
