import {
  TextInput,
  Title,
  Button,
  Stack,
  Center,
  Text,
  Container,
  Avatar,
  Group,
  Paper,
} from '@mantine/core';
import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';

function CreateLeague() {
  const [leagueName, setLeagueName] = useState<string>('');
  const [playerNames, setPlayerNames] = useState<{ [key: string]: string }>({});
  const [numberOfPlayers, setNumberOfPlayers] = useState(3);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    number: number
  ) => {
    const { value } = event.target;
    setPlayerNames((prev) => ({ ...prev, [number]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      playerNames,
      leagueName,
    };

    //send payload to api
    console.log({ payload });
  };

  const handleAddPlayer = () => {
    setNumberOfPlayers((prev) => prev + 1);
  };

  return (
    <Container mb="xl" size="xs">
      <Paper shadow="sm" radius="md" p="xl">
        <Stack gap="md">
          <Center>
            <Title c="#01457a">Create A League</Title>
          </Center>

          <Center>
            <Title c="#01457a" order={4}>
              Name Your League
            </Title>
          </Center>

          <TextInput
            label="League Name"
            withAsterisk
            description="Create a unique name for your league"
            placeholder="Enter league name"
            value={leagueName}
            onChange={(event) => setLeagueName(event.target.value)}
          />

          <Center>
            <Title c="#01457a" order={4}>
              Add Players
            </Title>
          </Center>
          <Center>
            <Group>
              <Avatar.Group>
                {Array.from(Array(numberOfPlayers).keys()).map((number) => (
                  <Avatar
                    key={number}
                    name={playerNames[number]}
                    color="initials"
                    allowedInitialsColors={[
                      'blue',
                      'red',
                      'green',
                      'lime',
                      'indigo',
                    ]}
                  />
                ))}
                {numberOfPlayers < 10 && (
                  <Avatar>
                    {' '}
                    <IconPlus stroke={1.5} />
                  </Avatar>
                )}
              </Avatar.Group>
              {numberOfPlayers < 4 && (
                <Text c="red">League must have at least 3 players</Text>
              )}
            </Group>
          </Center>

          {Array.from(Array(numberOfPlayers).keys()).map((number) => (
            <TextInput
              key={number}
              label="Enter Player Name"
              withAsterisk
              placeholder={`Player ${number + 1}`}
              value={playerNames[number] || ''}
              onChange={(event) => handleChange(event, number)}
            />
          ))}

          {numberOfPlayers < 10 && (
            <Button color="#01457a" variant="outline" onClick={handleAddPlayer}>
              Add Player
              <IconPlus stroke={1.5} />
            </Button>
          )}

          <Button color="#01457a" variant="filled" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
export default CreateLeague;
