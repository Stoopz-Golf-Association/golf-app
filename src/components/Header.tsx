import { Group, Button, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../main';
import classes from '../header.module.css';
import Cookies from 'js-cookie';

export function Header() {
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
                  <a
                    href="/login"
                    onClick={handleLoginClick}
                    className={classes.link}
                  >
                    Login
                  </a>
                </Button>

                <Button color="#01457a" onClick={handleSignUpClick}>
                  Sign up
                </Button>
              </>
            )}
          </Group>
        </Group>
      </header>
    </Box>
  );
}
