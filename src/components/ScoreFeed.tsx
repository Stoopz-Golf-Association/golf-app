import { Title, Text, Stack, Paper } from '@mantine/core';
import { PlayerScore } from '../pages/PlayerTable';

const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const year = date.getUTCFullYear().toString().slice(2);

  return `${month}/${day}/${year}`;
};

const ScoreFeed = ({ scores }: { scores: PlayerScore[] }) => {
  return (
    <>
      <Title c="#01457a" order={2}>
        Score Feed
      </Title>

      {scores.map((round, index) => (
        <Text c="#01457a" key={index} size="md">
          {round.player} shot a {round.score} at {round.course_name} in{' '}
          {round.location} on {formatDate(round.date)}.
        </Text>
      ))}
    </>
  );
};

export default ScoreFeed;
