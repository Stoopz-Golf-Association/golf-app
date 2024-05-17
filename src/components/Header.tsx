import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../main';
import classes from '../header.module.css';
import Cookies from 'js-cookie';
export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const navigate = useNavigate();
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);
  const handleSignUpClick = () => {
    navigate('/signup');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogOutClick = () => {
    navigate('/');
    Cookies.remove('auth');
    setIsAuthenticated(false);

    // document.cookie =
    //   'userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;=';
  };

  return (
    <Box pb={30}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <a href="/" className={classes.link}>
            <img
              src="/images/SGABouxBlue.png"
              alt="SGA"
              className={classes.boux}
              style={{
                height: 50,
                width: 100,
              }}
            />
          </a>

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="/" className={classes.link}>
              Leaderboard
            </a>

            <a href="/inputscore" className={classes.link}>
              Post Scores
            </a>
          </Group>

          <Group visibleFrom="sm">
            {isAuthenticated ? (
              <Button variant="default" onClick={handleLogOutClick}>
                Log Out
              </Button>
            ) : (
              <>
                <Button variant="default">
                  <a href="/login" className={classes.link}>
                    Login
                  </a>
                </Button>

                <Button>Sign up</Button>
              </>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>
    </Box>
  );
}
