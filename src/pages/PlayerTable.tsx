import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Title, Space, Group, Stack } from '@mantine/core';

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

  const rows = allPlayerScores?.map((player) => (
    <Table.Tr>
      <Table.Td></Table.Td>
      <Table.Td>{player.player}</Table.Td>
      <Table.Td c="#119C3F"></Table.Td>
      <Table.Td>{player.score}</Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <Title order={2}>Leaderboard</Title>

      <Stack h={800} bg="var(--mantine-color-body)" align="center">
        <Group justify="center" gap="sm">
          <Space h="md" />
          <Table highlightOnHover horizontalSpacing="xl">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Rank</Table.Th>
                <Table.Th>Player Name</Table.Th>
                <Table.Th c="#119C3F">AVG</Table.Th>
                <Table.Th>Score</Table.Th>
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
