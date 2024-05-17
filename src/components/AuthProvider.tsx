import { useState, useEffect } from 'react';
import '@mantine/core/styles.css';
import axios from 'axios';
import { useStore } from '../main';

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/.netlify/functions/auth `);
        setIsAuthenticated(true);
        setUser(response.data);
      } catch {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  ``;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};
