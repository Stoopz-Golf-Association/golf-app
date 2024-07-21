import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import InputScore from './pages/InputScore.tsx';
import { PlayerTable } from './pages/PlayerTable.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import About from './pages/About.tsx';
import '@mantine/core/styles.css';
import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
} from '@mantine/core';
import { PrivateRoute } from './components/PrivateRoute.tsx';
import { create } from 'zustand';
import { Header } from './components/Header.tsx';
import { AuthProvider } from './components/AuthProvider.tsx';
import '@mantine/dates/styles.css';
import CreateLeague from './pages/CreateLeague.tsx';

interface StoreState {
  isAuthenticated: boolean;
  user: {
    name?: string;
  };
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: { name?: string }) => void;
}

export const useStore = create<StoreState>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  user: {
    name: undefined,
  },
  setUser: (user: { name?: string }) => set({ user }),
}));

const myColor: MantineColorsTuple = [
  '#ebf6ff',
  '#d5e9fa',
  '#a5d2f7',
  '#73b9f6',
  '#50a4f5',
  '#3e97f5',
  '#3491f6',
  '#297ddb',
  '#1d6fc4',
  '#0060ad',
];

const theme = createTheme({
  colors: {
    myColor,
  },
});

const router = createBrowserRouter([
  {
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        path: '/inputscore',
        element: (
          <PrivateRoute>
            <InputScore />
          </PrivateRoute>
        ),
      },
      {
        path: '/',
        element: <PlayerTable />,
      },
      {
        path: '/create-league',
        element: <CreateLeague />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <MantineProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </MantineProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
