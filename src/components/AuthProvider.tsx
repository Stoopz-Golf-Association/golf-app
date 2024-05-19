import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../main';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthProviderProps {
  children: React.ReactElement;
  isAuthenticated: boolean;
  user: User | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User | null) => void;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    const authenticate = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<User>('/.netlify/functions/auth');
        setIsAuthenticated(true);
        setUser(response.data);
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, [setIsAuthenticated, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};
