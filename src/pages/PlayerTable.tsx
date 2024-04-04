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

  const groupedScores = allPlayerScores.reduce((acc, curr) => {
    if (!acc[curr.player]) {
      acc[curr.player] = [];
    }
    acc[curr.player].push(curr.score);
    return acc;
  }, {});

  const playerNames = Object.keys(groupedScores).map((player) => {
    const scores = groupedScores[player];
    const score =
      scores.reduce((acc, curr) => acc + Number(curr), 0) / scores.length;
    return {
      player,
      score,
      rounds: scores.length,
    };
  });

  const rows = playerNames
    ?.sort((a, b) => {
      if (isNaN(a.score)) {
        return isNaN(b.score) ? 1 : b.score;
      } else {
        return isNaN(b.score) ? -1 : a.score - b.score;
      }
    })
    .map((player, index) => (
      <Table.Tr>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{player.player}</Table.Td>
        <Table.Td c="#119C3F">
          {player.score ? player.score.toFixed(2) : '-'}
        </Table.Td>
        <Table.Td>{player.rounds}</Table.Td>
      </Table.Tr>
    ));

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
