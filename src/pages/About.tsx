import {
  Text,
  Title,
  List,
  ListItem,
  Stack,
  Group,
  Container,
  Paper,
} from '@mantine/core';

function About() {
  return (
    <>
      <Container size="md">
        <Paper shadow="sm" radius="md" p="xl">
          <Stack mb="xl" align="center" gap="md">
            <img
              src="/images/SGAGolfBall.jpg"
              alt="Stoopz Golf"
              width={750}
              height={450}
            />
            <Title order={1}>About Stoopz Golf</Title>
            <Text>
              Welcome to Stoopz.golf, your dynamic leaderboard for tracking and
              comparing golf scores among friends! Whether you're a weekend
              warrior or an occasional player, our platform helps you see how
              your scores stack up head to head.
            </Text>
            <Title order={4}>Our Mission: </Title>
            <Text>
              At Stoopz.golf, we aim to enhance the golfing experience by
              fostering friendly competition and camaraderie among players. Our
              easy-to-use leaderboard keeps you connected and motivated, no
              matter how often you hit the links.
            </Text>
            <Title order={4}>How It Works:</Title>
            <Text>
              The rules are simple. Whenever two or more members of your group
              play on the same course at the same time, their scores are
              eligible for entry into the leaderboard. This encourages regular
              play and offers a fun way to measure progress against your
              friends.{' '}
            </Text>
            <Title order={4}>Getting Started: </Title>
            <Text>
              <List type="ordered" withPadding>
                <ListItem>
                  <Group>
                    <Text fw={700}>Sign Up:</Text>Create an account by clicking
                    the Sign Up button.
                  </Group>
                </ListItem>

                <ListItem>
                  <Group>
                    <Text fw={700}>Select Players:</Text> Choose the number of
                    players and then select the players from your group.
                  </Group>
                </ListItem>

                <ListItem>
                  <Group>
                    <Text fw={700}>Input Scores:</Text>Enter each player's score
                    for the round.
                  </Group>
                </ListItem>
                <ListItem>
                  <Group>
                    <Text fw={700}>Select Course:</Text>Choose the golf course
                    where the round was played.
                  </Group>
                </ListItem>
                <ListItem>
                  <Group>
                    <Text fw={700}>Enter Date:</Text>Select the date of the
                    round.
                  </Group>
                </ListItem>
              </List>
            </Text>
            <Text>
              Stoopz.golf takes care of the rest, ensuring your scores are
              accurately entered into the leaderboard.
            </Text>
            <Title order={4}>Why Choose Stoopz.golf?</Title>
            <Text>
              <List withPadding>
                <ListItem>
                  <Group>
                    <Text fw={700}>User-Friendly:</Text> Our platform is
                    designed to be intuitive and easy to navigate.
                  </Group>
                </ListItem>
                <ListItem>
                  <Group>
                    <Text fw={700}>Community-Focused:</Text>Engage in healthy
                    competition with friends and fellow golf enthusiasts.
                  </Group>
                </ListItem>
                <ListItem>
                  <Group>
                    <Text fw={700}>Track Progress:</Text>Monitor your
                    performance and see improvements over time.
                  </Group>
                </ListItem>
              </List>
            </Text>
            <Text>
              Join Stoopz.golf today and take your golf game to the next level
              by tracking your scores and competing with friends in a fun,
              friendly environment.
            </Text>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default About;
