import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Spinner, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import lo from './Layout.module.scss';

const Layout: FC = () => {
  return (
    <div className={lo.wrapper}>
      <Header />
      <Box mt="24px">
        <Outlet />
      </Box>
    </div>
  );
};

export default Layout;
