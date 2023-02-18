import { Box, Checkbox, Heading, Input, Text, Button, Link, useToast } from '@chakra-ui/react';
import { FC, FormEvent, useEffect, useState } from 'react';
import { Link as LinkRoute, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import reg from './Register.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { authRegister } from '../../store/action-creator/auth';

const Register: FC<any> = () => {
  const { logined, error } = useAppSelector((state) => state.authReducer);
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (logined) {
      navigate('/articles');
      toast({
        position: 'bottom-right',
        colorScheme: 'green',
        status: 'success',
        title: 'Successfully',
        description: 'You have successfully registered',
      });
    }
    console.log('я тут');
  }, [logined]);
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

  const test = (data: any) => {
    console.log(data);
    dispatch(authRegister(data));
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      w="384px"
      m="59px auto 0px auto"
      bg="white"
      minH="599px"
      borderRadius="6px"
    >
      <Heading fontSize="20px" pt="48px" mb="21px">
        Create new account
      </Heading>
      <form className={reg.formreg} onSubmit={handleSubmit(test)}>
        <label>
          <Text fontSize={'14px'}>Username</Text>
          <Input
            w={'320px'}
            h={'40px'}
            type={'text'}
            {...register('username', {
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
            placeholder="Username"
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
            placeholder="Email address"
            {...register('email', {
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
          <Text fontSize={'14px'}>Password</Text>
          <Input
            w={'320px'}
            h={'40px'}
            type={'password'}
            placeholder="Password"
            {...register('pass', {
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
            {errors?.pass && <>{errors?.pass?.message || 'Error'}</>}{' '}
          </Text>
        </label>
        <label>
          <Text fontSize={'14px'}>Repeat password</Text>
          <Input
            w={'320px'}
            h={'40px'}
            type={'password'}
            placeholder="Password"
            {...register('repeatPass', {
              required: 'This field should not be empty',
              validate: (val: string) => {
                if (watch('pass') != val) {
                  return 'Your passwords do not match';
                }
              },
            })}
          />
          <Text fontSize={'14px'} color="red">
            {errors?.repeatPass && <>{errors?.repeatPass?.message || 'Error'}</>}{' '}
          </Text>
        </label>
        <Checkbox
          w="309px"
          alignItems="baseline"
          mt="18px"
          {...register('check', { required: 'The field must be filled in' })}
        >
          <Text fontSize={'14px'}>I agree to the processing of my personal information</Text>
        </Checkbox>
        <Text fontSize={'14px'} color="red">
          {errors?.check && <>{errors?.check?.message || 'Error'}</>}{' '}
        </Text>
        <Button colorScheme="blue" mt="12px" type="submit" w="319px" h="40px" mb="8px">
          Create
        </Button>
      </form>
      <Box mb={'16px'}>
        <Text display={'inline-block'} color="#595959" mr={1} fontSize={12}>
          Already have an account?
        </Text>
        <Link colorScheme="blue" color="#1890FF" as={LinkRoute} to="/sign-in" fontSize={12}>
          Sign In.
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
