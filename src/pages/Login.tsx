import {
  TextInput,
  PasswordInput,
  Stack,
  Container,
  Button,
  Alert,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '../main';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/.netlify/functions/login `, {
        userName,
        password,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data);
        navigate('/');
      } else if (response.status === 404) {
        setErrorMessage('User not found. Please check your username.');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('User not found. Please check your username.');
    }
  };

  return (
    <Container size="30rem">
      <Stack h={800} bg="var(--mantine-color-body)" align="left">
        {errorMessage && (
          <Alert variant="light" color="red" title="Login Error">
            {errorMessage}
          </Alert>
        )}
        <TextInput
          label="Enter Username"
          placeholder="Username"
          onChange={(event) => setUserName(event.target.value)}
          value={userName}
        />
        <PasswordInput
          label="Enter Password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />

        <Button variant="default" onClick={handleSubmit}>
          Login
        </Button>
        <Button variant="filled" onClick={handleSignUpClick}>
          Sign Up
        </Button>
      </Stack>
    </Container>
  );
}

export default Login;
