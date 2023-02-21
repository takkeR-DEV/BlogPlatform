import { Box, Button, Heading, Input, Spinner, Stack, Text, useToast } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { editProfile } from '../../store/action-creator/auth';
import { DataFormType } from '../../types/auth';
import ep from './EditProfile.module.scss';

const EditProfile: FC = () => {
  const { logined, user } = useAppSelector((state) => state.authReducer);
  const toast = useToast();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm({
    mode: 'onBlur',
  });
  const editProf = (data: DataFormType) => {
    dispatch(editProfile(data, user.token)).then(() => {
      navigate('/articles/');
      toast({
        position: 'bottom-right',
        colorScheme: 'green',
        status: 'success',
        title: 'Successfully',
        description: 'You have successfully changed profile',
      });
    });
  };
  return (
    <>
      {user.username ? (
        <Box
          display="flex"
          w="384px"
          m="59px auto 0px auto"
          flexDirection="column"
          alignItems="center"
          gap="20px"
          bg="white"
          minH="498px"
          borderRadius="6px"
        >
          <Heading fontSize="20px" pt="48px">
            Edit Profile
          </Heading>
          <form className={ep.formProfile} onSubmit={handleSubmit(editProf)}>
            <label>
              <Text fontSize={'14px'}>Username</Text>
              <Input
                w={'320px'}
                h={'40px'}
                type={'text'}
                {...register('username', {
                  value: user.username,
                  required: 'This field should not be empty',
                  minLength: {
                    value: 3,
                    message: 'Minimum 3 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Maximum 20 characters',
                  },
                })}
                placeholder={'Username'}
              />
              <Text fontSize={'14px'} color="red">
                {errors?.username && <>{errors?.username?.message || 'Error'}</>}{' '}
              </Text>
            </label>
            <label>
              <Text fontSize={'14px'}>Email address</Text>
              <Input
                focusBorderColor={errors?.email ? 'red.400' : 'black'}
                w={'320px'}
                h={'40px'}
                placeholder={'Email adress'}
                {...register('email', {
                  value: user.email,
                  required: 'This field should not be empty',
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'Incorrect mail',
                  },
                })}
              />
              <Text fontSize={'14px'} color="red">
                {errors?.email && <>{errors?.email?.message || 'Error'}</>}{' '}
              </Text>
            </label>
            <label>
              <Text fontSize={'14px'}>New password</Text>
              <Input
                w={'320px'}
                h={'40px'}
                type={'password'}
                placeholder="Password"
                {...register('password', {
                  required: 'This field should not be empty',
                  minLength: {
                    value: 6,
                    message: 'Minimum 6 characters',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Maximum 40 characters',
                  },
                })}
              />
              <Text fontSize={'14px'} color="red">
                {errors?.password && <>{errors?.password?.message || 'Error'}</>}{' '}
              </Text>
            </label>
            <label>
              <Text fontSize={'14px'}>Avatar image(url)</Text>
              <Input
                w={'320px'}
                h={'40px'}
                type={'text'}
                {...register('image', {
                  pattern: {
                    value:
                      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(.jpg|.png|.gif)/,
                    message: 'Incorrect URL',
                  },
                })}
                placeholder="Avatar image"
              />
              <Text fontSize={'14px'} color="red">
                {errors?.image && <>{errors?.image?.message || 'Error'}</>}{' '}
              </Text>
            </label>

            <Button colorScheme="blue" mt="12px" type="submit" mb="30px">
              Save
            </Button>
          </form>
        </Box>
      ) : (
        <Stack direction="row" display="flex" justifyContent="center" mt="206px">
          <Spinner size="xl" color="blue.300" />
        </Stack>
      )}
    </>
  );
};

export default EditProfile;
