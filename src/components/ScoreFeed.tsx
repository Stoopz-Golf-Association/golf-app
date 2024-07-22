import { Title, Text } from '@mantine/core';
import { PlayerScore } from '../pages/PlayerTable';
import FormatDate from '../Utilities/FormatDate';

const ScoreFeed = ({ scores }: { scores: PlayerScore[] }) => {
  return (
    <>
      <Title c="#01457a" order={2}>
        Score Feed
      </Title>

      {scores.map((round, index) => (
        <Text c="#01457a" key={index} size="md">
          {round.player} shot a {round.score} at {round.course_name} in{' '}
          {round.location} on {FormatDate(round.date)}.
        </Text>
      ))}
    </>
  );
};

export default ScoreFeed;
