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
      <TextInput
        min={10}
        max={20}
        radius="xs"
        label={`Input ${player}'s Score`}
        withAsterisk
        placeholder="ex: 72"
        onChange={(event) =>
          setPlayerScores((prevScores) => ({
            ...prevScores,
            [player]: event.target.value,
          }))
        }
        value={playerScores && playerScores[player]}
      />
    );
  });
}
export { PlayerScores };
