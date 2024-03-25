import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import InputScore from './pages/InputScore.tsx';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header.tsx';
import { PlayerTable } from './pages/PlayerTable.tsx';
import '@mantine/core/styles.css';
import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
} from '@mantine/core';

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

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/inputscore',
        element: <InputScore />,
      },
      {
        path: '/',
        element: <PlayerTable />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
