import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isLoggedIn } = useUser();

  console.log("Is Logged In:", isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
