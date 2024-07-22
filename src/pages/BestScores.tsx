import React from 'react';
import { Card, Stack, Avatar, Text, Group, Box, Title } from '@mantine/core';
import {
  IconCircleNumber1Filled,
  IconCircleNumber2Filled,
  IconCircleNumber3Filled,
} from '@tabler/icons-react';
import { PlayerScore } from './PlayerTable';

type BestScoresProps = {
  allPlayerScores: PlayerScore[];
  playerAvatars: { [key: string]: string };
};

const BestScores: React.FC<BestScoresProps> = ({
  allPlayerScores,
  playerAvatars,
}) => {
  const bestScores = allPlayerScores.reduce(
    (scores, score) => {
      const diff = Number(score.score) - Number(score.par);

      if (diff < scores['1'].diff) {
        scores['3'] = scores['2'];
        scores['2'] = scores['1'];
        scores['1'] = {
          ...score,
          diff,
        };
      } else if (diff < scores['2'].diff) {
        scores['3'] = scores['2'];
        scores['2'] = {
          ...score,
          diff,
        };
      } else if (diff < scores['3'].diff) {
        scores['3'] = {
          ...score,
          diff,
        };
      }

      return scores;
    },
    {
      '1': { diff: Infinity } as PlayerScore,
      '2': { diff: Infinity } as PlayerScore,
      '3': { diff: Infinity } as PlayerScore,
    }
  );

  const topThreeScorers = Object.values(bestScores).map((player, index) => (
    <Card
      h="300"
      w="250"
      shadow="xl"
      padding="lg"
      radius="md"
      withBorder
      key={index}
    >
      <Box pos="absolute" top="0" left="0">
        {index === 0 && <IconCircleNumber1Filled size="30" color="#D6AF36" />}
        {index === 1 && <IconCircleNumber2Filled size="30" color="#A7A7AD" />}
        {index === 2 && <IconCircleNumber3Filled size="30" color="#A77044" />}
      </Box>
      <Stack gap="sm" align="center">
        <Avatar
          size="lg"
          name={player.player}
          src={playerAvatars[player.player]}
        />
        <Stack gap="sm" align="center">
          <Text c="#01457a" size="lg" fw={700}>
            {player.player}
          </Text>
          <Group>
            <Text size="lg" c="#01457a" fw={400}>
              VS Par:
            </Text>
            <Text c="#01457a" fw={600}>
              {player.diff}
            </Text>
          </Group>
          <Group>
            <Text size="lg" c="#01457a" fw={400}>
              Score:
            </Text>
            <Text size="lg" c="#01457a" fw={600}>
              {player.score}
            </Text>
          </Group>
          <Text c="#01457a" fw={100}>
            {player.course_name}
          </Text>
          <Text c="#01457a" fw={100}>
            {player.date}
          </Text>
        </Stack>
      </Stack>
    </Card>
  ));

  return (
    <>
      <Title c="#01457a" order={2}>
        Best Scores
      </Title>
      <Group gap="xl">{topThreeScorers}</Group>
    </>
  );
};

export default BestScores;
