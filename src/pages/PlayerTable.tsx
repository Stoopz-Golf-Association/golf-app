import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Title, Space, Group, Stack } from '@mantine/core';
import ScoreFeed from '../components/ScoreFeed';
// import '@mantine/core/styles.css'; //import Mantine V7 styles needed by MRT
// import '@mantine/dates/styles.css'; //if using mantine date picker features
// import 'mantine-react-table/styles.css'; //import MRT styles
// import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

type PlayerScore = {
  player: string;
  score: number;
  par: string;
};

function PlayerTable() {
  const [allPlayerScores, setAllPlayerScores] = useState<PlayerScore[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const result = await axios.get(`/.netlify/functions/getScores`);
        setAllPlayerScores(result.data.scores);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, [setAllPlayerScores]);

  const groupedScores: { [player: string]: [{ score: number; par: number }] } =
    allPlayerScores.reduce((acc, curr) => {
      if (!acc[curr.player]) {
        acc[curr.player] = [
          {
            score: Number(curr.score),
            par: Number(curr.par),
          },
        ];
      } else {
        acc[curr.player].push({
          score: Number(curr.score),
          par: Number(curr.par),
        });
      }
      return acc;
    }, {} as { [player: string]: [{ score: number; par: number }] });

  const playerNames = Object.keys(groupedScores).map((player) => {
    const scores = groupedScores[player];

    const strokesAgainstPar =
      scores.reduce((acc, curr) => acc + (curr.score - curr.par), 0) /
      scores.length;
    const avgStrokes =
      scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length;
    return {
      player,
      strokesAgainstPar,
      avgStrokes,
      rounds: scores.length,
    };
  });

  const rows = playerNames
    ?.sort((a, b) => {
      if (isNaN(a.strokesAgainstPar)) {
        return isNaN(b.strokesAgainstPar) ? 1 : b.strokesAgainstPar;
      } else {
        return isNaN(b.strokesAgainstPar)
          ? -1
          : a.strokesAgainstPar - b.strokesAgainstPar;
      }
    })
    .map((player, index) => (
      <Table.Tr>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{player.player}</Table.Td>
        <Table.Td c="#119C3F">
          {player.avgStrokes ? player.avgStrokes.toFixed(2) : '-'}
        </Table.Td>
        <Table.Td>
          {player.strokesAgainstPar ? player.strokesAgainstPar.toFixed(2) : '-'}
        </Table.Td>
        <Table.Td>{player.rounds}</Table.Td>
      </Table.Tr>
    ));

  return (
    <>
      <Stack h={800} bg="var(--mantine-color-body)" align="center">
        <Title order={2}>Leaderboard</Title>
        <Group justify="center" gap="sm">
          <Space h="md" />
          <Table highlightOnHover horizontalSpacing="xl">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Rank</Table.Th>
                <Table.Th>Player Name</Table.Th>
                <Table.Th c="#119C3F">AVG</Table.Th>
                <Table.Th>VS Par</Table.Th>

                <Table.Th>Total Rounds</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Group>
        <ScoreFeed />
      </Stack>
    </>
  );
}
export { PlayerTable };
