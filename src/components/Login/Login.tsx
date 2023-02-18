import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Heading,
  Input,
  Link,
  Text,
  AlertIcon,
  Stack,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as LinkRoute, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { authLogin } from '../../store/action-creator/auth';
import login from './Login.module.scss';
// interface RegisterProps {}

const Register: FC<any> = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { logined, error, authLoading } = useAppSelector((state) => state.authReducer);
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [repeatPassword, setRepeatPassword] = useState('');
  // const test = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(username);
  // };
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (logined) {
      navigate('/articles');
      toast({
        position: 'top-right',
        colorScheme: 'green',
        status: 'success',
        title: 'Successfully',
        description: 'You have successfully logged in',
      });
    }
    console.log('я тут');
  }, [logined]);

  useEffect(() => {
    if (error) {
      toast({
        position: 'top-right',
        colorScheme: 'green',
        status: 'error',
        title: 'Error',
        description: 'Incorrect email or password',
      });
    }
    console.log('я тут');
  }, [error]);

  const test = (data: any) => {
    console.log(data);
    dispatch(authLogin(data));
  };

  return (
    <Box
      display="flex"
      w="384px"
      m="59px auto 0px auto"
      flexDirection="column"
      alignItems="center"
      gap="20px"
      bg="white"
      minH="374px"
      borderRadius="6px"
    >
      <Heading fontSize="20px" pt="48px">
        Sign In
      </Heading>
      <form className={login.formreg} onSubmit={handleSubmit(test)}>
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
            })}
          />
          <Text fontSize={'14px'} color="red">
            {errors?.pass && <>{errors?.pass?.message || 'Error'}</>}{' '}
          </Text>
        </label>

        <Button colorScheme="blue" mt="12px" type="submit">
          Login
        </Button>
        {error ? (
          <Alert status="error" h="35px">
            <AlertIcon />
            email or password is invalid
          </Alert>
        ) : null}
        <Box>
          <Text display={'inline-block'} color="#595959" mr={1} ml={'72px'} fontSize={12}>
            Don’t have an account?
          </Text>
          <Link colorScheme="blue" color="#1890FF" as={LinkRoute} to="/sign-up" fontSize={12}>
            Sign Up.
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default Register;