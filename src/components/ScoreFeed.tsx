import { useEffect, useState } from 'react';
import { Title, Text } from '@mantine/core';
import axios from 'axios';

type PlayerScore = {
  player: string;
  score: number;
  course_name: string;
  location: string;
};
const today = new Date().toLocaleDateString();
function ScoreFeed() {
  const [playerFeed, setPlayerFeed] = useState<PlayerScore[]>([]);
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const result = await axios.get(`/.netlify/functions/getScores`);
        setPlayerFeed(result.data.scores.slice(-7).reverse());
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, [setPlayerFeed]);

  console.log(playerFeed);
  return (
    <>
      <Title order={2}>Score Feed</Title>
      {playerFeed.map((round) => {
        return (
          <Text size="md">
            {round.player} shot a {round.score} at {round.course_name} in{' '}
            {round.location} on {today}.
          </Text>
        );
      })}
    </>
  );
}
export default ScoreFeed;
