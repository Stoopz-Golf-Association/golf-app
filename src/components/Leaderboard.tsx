import { Table, Title, Group, Avatar, Loader } from '@mantine/core';
import { PlayerScore } from '../pages/PlayerTable';

interface LeaderboardProps {
  playerAvatars: { [key: string]: string };
  isLoading: boolean;
  allPlayerScores: PlayerScore[];
}

function Leaderboard({
  playerAvatars,
  isLoading,
  allPlayerScores,
}: LeaderboardProps) {
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
    <>
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
    </>
  );
}
export default Leaderboard;
