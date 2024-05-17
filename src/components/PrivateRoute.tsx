import { Navigate } from 'react-router-dom';
import { useStore } from '../main';

type Props = {
  children: React.ReactElement;
};

export const PrivateRoute = ({ children }: Props) => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};
