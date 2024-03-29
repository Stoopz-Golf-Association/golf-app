import { MultiSelect } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  numPlayers: string | undefined;
  playerNames: string[];
  setPlayerNames: Dispatch<SetStateAction<string[]>>;
};

function SelectPlayers({ numPlayers, playerNames, setPlayerNames }: Props) {
  return (
    // <Center maw={400} h={100} bg="var(--mantine-color-gray-light)">
    <MultiSelect
      label="Select Players"
      placeholder="Select Players"
      data={[
        'Stokes',
        'JP',
        'Boosh',
        'Boux',
        'Logan',
        'Jesse',
        'Sammy T',
        'Cojack',
      ]}
      maxValues={Number(numPlayers)}
      value={playerNames}
      onChange={setPlayerNames}
    />
    // </Center>
  );
}
export { SelectPlayers };
