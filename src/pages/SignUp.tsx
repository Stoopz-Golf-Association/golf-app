import {
  TextInput,
  PasswordInput,
  Stack,
  Container,
  Button,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../main';

function SignUp() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const handleSubmit = async () => {
    if (password === rePassword) {
      await axios.post(`/.netlify/functions/signUp `, {
        userName,
        password,
      });
    }
  };
  return (
    <Container size="30rem">
      <Stack h={800} bg="var(--mantine-color-body)" align="left">
        <TextInput
          label="Create Username"
          placeholder="Username"
          onChange={(event) => setUserName(event.target.value)}
          value={userName}
        />
        <PasswordInput
          label="Create Password"
          placeholder="Create Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <PasswordInput
          label="Re-enter Password"
          placeholder="Re-enter Password"
          onChange={(event) => setRePassword(event.target.value)}
          value={rePassword}
        />

        <Button variant="filled" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Container>
  );
}

export default SignUp;
