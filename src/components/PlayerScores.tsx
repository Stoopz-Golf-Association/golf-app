import { TextInput } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';

export type Props = {
  playerNames: string[];
  playerScores: { [key: string]: string } | undefined;
  setPlayerScores: Dispatch<
    SetStateAction<{ [key: string]: string } | undefined>
  >;
};

function PlayerScores({ playerNames, playerScores, setPlayerScores }: Props) {
  return playerNames.map((player: string) => {
    return (
      // <Center maw={400} h={100} bg="var(--mantine-color-gray-light)">
      <TextInput
        min={10}
        max={20}
        radius="xs"
        label="Input Player Score"
        withAsterisk
        placeholder={`Input ${player}'s score`}
        onChange={(event) =>
          setPlayerScores((prevScores) => ({
            ...prevScores,
            [player]: event.target.value,
          }))
        }
        value={playerScores && playerScores[player]}
      />
      // </Center>
    );
  });
}
export { PlayerScores };
