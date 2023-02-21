import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const { logined } = useAppSelector((state) => state.authReducer);
  const location = useLocation();
  if (!logined) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  return children;
};

interface RequireAuthProps {
  children: JSX.Element;
}

export default RequireAuth;
