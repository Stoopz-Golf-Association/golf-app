import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Title, Group, Stack, Avatar, Loader } from '@mantine/core';

import ScoreFeed from '../components/ScoreFeed';
import BestScores from './BestScores';
import WorstScores from './WorstScores';

export type PlayerScore = {
  player: string;
  score: number;
  course_name: string;
  location: string;
  date: string;
  par: string;
  diff: number;
};

export type PlayerAvatars = {
  [key: string]: string;
};

const stokesHeadshot = '/headshots/StokesAIHeadshot.png';
const jpHeadshot = '/headshots/JPHeadshot.jpg';
const sammyTHeadshot = '/headshots/SammyTHeadshot.jpeg';
const booshHeadshot = '/headshots/BooshHeadshot.jpeg';
const jesseHeadshot = 'headshots/JesseProctor.jpeg';
const bouxHeadshot = '/headshots/BouxHeadshot.jpeg';
const loganHeadshot = '/headshots/LoganHeadshot1.png';
const codyHeadshot = '/headshots/CodyHeadshot.jpeg';

const playerAvatars: PlayerAvatars = {
  Stokes: stokesHeadshot,
  JP: jpHeadshot,
  'Sammy T': sammyTHeadshot,
  Boosh: booshHeadshot,
  Jesse: jesseHeadshot,
  Boux: bouxHeadshot,
  Logan: loganHeadshot,
  Cojack: codyHeadshot,
};

function PlayerTable() {
  const [allPlayerScores, setAllPlayerScores] = useState<PlayerScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setIsLoading(true);

        const result = await axios.get(`/.netlify/functions/getScores`);
        setAllPlayerScores(result.data.scores);
      } catch (error) {
        console.error('Error fetching scores:', error);
      } finally {
        setIsLoading(false);
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
            courseName: curr.course_name,
            diff: Number(curr.score) - Number(curr.par),
            date: curr.date,
          },
        ];
      } else {
        acc[curr.player].push({
          score: Number(curr.score),
          par: Number(curr.par),
          courseName: curr.course_name,
          diff: Number(curr.score) - Number(curr.par),
          date: curr.date,
        });
      }
      return acc;
    }, {} as { [player: string]: [{ score: number; par: number; courseName: string; diff: number; date: string }] });

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
        <Table.Td c="#01457a">{index + 1}</Table.Td>
        <Table.Td c="#01457a">
          <Group>
            <Avatar name={player.player} src={playerAvatars[player.player]} />
            {player.player}
          </Group>
        </Table.Td>
        <Table.Td c="#119C3F">
          {player.avgStrokes ? player.avgStrokes.toFixed(2) : '-'}
        </Table.Td>
        <Table.Td c="red">
          {player.strokesAgainstPar ? player.strokesAgainstPar.toFixed(2) : '-'}
        </Table.Td>
        <Table.Td c="#01457a">{player.rounds}</Table.Td>
      </Table.Tr>
    ));

  return (
    <Stack bg="var(--mantine-color-body)" align="center" gap="xl" mb="xl">
      <Title c="#01457a" order={2}>
        Leaderboard
      </Title>
      <Group justify="center">
        {isLoading ? (
          <Loader type="bars" color="#01457a" size="lg" />
        ) : (
          <Table highlightOnHover horizontalSpacing="xl">
            <Table.Thead>
              <Table.Tr c="#01457a">
                <Table.Th>Rank</Table.Th>
                <Table.Th>Player Name</Table.Th>
                <Table.Th>AVG</Table.Th>
                <Table.Th>Handicap</Table.Th>

                <Table.Th>Total Rounds</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}
      </Group>

      <BestScores
        allPlayerScores={allPlayerScores}
        playerAvatars={playerAvatars}
      />
      <WorstScores
        allPlayerScores={allPlayerScores}
        playerAvatars={playerAvatars}
      />

      <ScoreFeed scores={allPlayerScores.slice(-7).reverse()} />
    </Stack>
  );
}
export { PlayerTable };
