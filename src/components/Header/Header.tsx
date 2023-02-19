/* eslint-disable @typescript-eslint/no-empty-interface */
import { Box, Button, ButtonGroup, Link, Text, Image, useToast } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { LogOut } from '../../store/action-creator/auth';
import header from './Header.module.scss';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { logined, user } = useAppSelector((state) => state.authReducer);
  const defaultImage = 'https://static.productionready.io/images/smiley-cyrus.jpg';

  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const accountLogOut = () => {
    dispatch(LogOut());
    toast({
      position: 'bottom-right',
      colorScheme: 'green',
      status: 'info',
      title: 'Successfully',
      description: 'You have successfully logged out of your account',
    });
    navigate('/');
  };

  return (
    <header className={header.header}>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        maxW="1440px"
        m="0 auto"
        alignItems="center"
        p="0 19px"
      >
        <Link as={RouteLink} fontSize="18px" fontWeight="500" to="/">
          Realworld Blog
        </Link>
        {!logined ? (
          <ButtonGroup>
            <Button colorScheme="gray" variant="ghost" onClick={() => navigate('sign-in')}>
              Sign In
            </Button>
            <Button colorScheme="whatsapp" variant="outline" onClick={() => navigate('sign-up')}>
              Sign Up
            </Button>
          </ButtonGroup>
        ) : (
          <Box display={'flex'} gap="10px" alignItems={'center'}>
            <Button
              w="112px"
              h="31px"
              variant="outline"
              colorScheme={'whatsapp'}
              mr="15px"
              onClick={() => navigate('/new-article')}
            >
              Create Article
            </Button>
            <Link as={RouteLink} fontSize="18px" fontWeight="500" to="/profile">
              <Box display={'flex'} gap="10px" alignItems={'center'}>
                <Text fontSize={'18px'} lineHeight="28px">
                  {user.username ? user.username : '213'}
                </Text>
                <Image borderRadius="full" boxSize="46px" src={user.image ? user.image : defaultImage} alt="аватар" />
              </Box>
            </Link>
            <Button w="109px" h="51px" variant="outline" colorScheme={'black'} ml="15px" onClick={accountLogOut}>
              Log Out
            </Button>
          </Box>
        )}
      </Box>
    </header>
  );
};

export default Header;
