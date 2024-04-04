import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Title, Space, Group, Stack, Container } from '@mantine/core';

type PlayerScore = {
  player: string;
  score: string;
};

function PlayerTable() {
  const [allPlayerScores, setAllPlayerScores] = useState<PlayerScore[]>([]);
  useEffect(() => {
    (async () => {
      const result = await axios.get(`/.netlify/functions/getScores `);
      setAllPlayerScores(result.data.scores);
    })();
  }, [setAllPlayerScores]);
  console.log(allPlayerScores);

  const stokesScores: string[] = [];
  const jpScores: string[] = [];
  const booshScores: string[] = [];
  const bouxScores: string[] = [];
  const loganScores: string[] = [];
  const sammyTScores: string[] = [];
  const jesseScores: string[] = [];
  const cojackScores: string[] = [];

  const filteredScores = allPlayerScores.filter((player) => {
    if (player.player === 'Stokes') {
      stokesScores.push(player.score);
      return true;
    } else if (player.player === 'JP') {
      jpScores.push(player.score);
      return true;
    } else if (player.player === 'Boosh') {
      booshScores.push(player.score);
      return true;
    } else if (player.player === 'Boux') {
      bouxScores.push(player.score);
      return true;
    } else if (player.player === 'Logan') {
      loganScores.push(player.score);
      return true;
    } else if (player.player === 'Sammy T') {
      sammyTScores.push(player.score);
      return true;
    } else if (player.player === 'Jesse') {
      jesseScores.push(player.score);
      return true;
    } else if (player.player === 'Cojack') {
      cojackScores.push(player.score);
      return true;
    }
    return false;
  });

  const stokesAvg =
    stokesScores.reduce((a, b) => a + Number(b), 0) / stokesScores.length;

  const jpAvg = jpScores.reduce((a, b) => a + Number(b), 0) / jpScores.length;

  const booshAvg =
    booshScores.reduce((a, b) => a + Number(b), 0) / booshScores.length;

  const bouxAvg =
    bouxScores.reduce((a, b) => a + Number(b), 0) / bouxScores.length;

  const loganAvg =
    loganScores.reduce((a, b) => a + Number(b), 0) / loganScores.length;

  const sammyTAvg =
    sammyTScores.reduce((a, b) => a + Number(b), 0) / sammyTScores.length;

  const jesseAvg =
    jesseScores.reduce((a, b) => a + Number(b), 0) / jesseScores.length;

  const cojackAvg =
    cojackScores.reduce((a, b) => a + Number(b), 0) / cojackScores.length;

  const playerNames = [
    {
      player: 'Stokes',
      score: stokesAvg,
      rounds: stokesScores.length,
    },
    { player: 'JP', score: jpAvg, rounds: jpScores.length },
    { player: 'Boosh', score: booshAvg, rounds: booshScores.length },
    { player: 'Boux', score: bouxAvg, rounds: bouxScores.length },
    { player: 'Logan', score: loganAvg, rounds: loganScores.length },
    { player: 'SammyT', score: sammyTAvg, rounds: sammyTScores.length },
    { player: 'Jesse', score: jesseAvg, rounds: jesseScores.length },
    { player: 'Cojack', score: cojackAvg, rounds: cojackScores.length },
  ];

  const rows = playerNames?.map((player) => (
    <Table.Tr>
      <Table.Td></Table.Td>
      <Table.Td>{player.player}</Table.Td>
      <Table.Td c="#119C3F">{player.score.toFixed(2)}</Table.Td>
      <Table.Td>{player.rounds}</Table.Td>
    </Table.Tr>
  ));

  // const rows = allPlayerScores?.map((player) => (
  //   <Table.Tr>
  //     <Table.Td>{player._id}</Table.Td>
  //     <Table.Td>{player.player}</Table.Td>
  //     <Table.Td c="#119C3F"></Table.Td>
  //     <Table.Td>{player.score}</Table.Td>
  //   </Table.Tr>
  // ));

  const sortedScores = playerNames.sort(
    (a, b) => Number(b.score) - Number(a.score)
  );

  sortedScores.forEach((player, index) => {
    player.rank = index + 1;
  });

  console.log(sortedScores);
  return (
    <>
      <Container>
        <Title order={2}>Leaderboard</Title>
      </Container>

      <Stack h={800} bg="var(--mantine-color-body)" align="center">
        <Group justify="center" gap="sm">
          <Space h="md" />
          <Table highlightOnHover horizontalSpacing="xl">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Rank</Table.Th>
                <Table.Th>Player Name</Table.Th>
                <Table.Th c="#119C3F">AVG</Table.Th>

                <Table.Th>Total Rounds</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Group>
      </Stack>
    </>
  );
}
export { PlayerTable };
