import { useEffect, useState } from 'react';
import axios from 'axios';
import { Stack } from '@mantine/core';
import Leaderboard from '../components/Leaderboard';
import ScoreFeed from '../components/ScoreFeed';
import BestScores from '../components/BestScores';
import WorstScores from '../components/WorstScores';

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

const headshots = [
  { name: 'Stokes', path: '/headshots/StokesAIHeadshot.png' },
  { name: 'JP', path: '/headshots/JPHeadshot.jpg' },
  { name: 'Sammy T', path: '/headshots/SammyTHeadshot.jpeg' },
  { name: 'Boosh', path: '/headshots/BooshHeadshot.jpeg' },
  { name: 'Jesse', path: 'headshots/JesseProctor.jpeg' },
  { name: 'Boux', path: '/headshots/BouxHeadshot.jpeg' },
  { name: 'Logan', path: '/headshots/LoganHeadshot1.png' },
  { name: 'Cojack', path: '/headshots/CodyHeadshot.jpeg' },
];

const playerAvatars = headshots.reduce((acc, player) => {
  acc[player.name] = player.path;
  return acc;
}, {} as PlayerAvatars);

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

  return (
    <Stack align="center" gap="xl" mb="xl">
      <Leaderboard
        allPlayerScores={allPlayerScores}
        isLoading={isLoading}
        playerAvatars={playerAvatars}
      />
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
