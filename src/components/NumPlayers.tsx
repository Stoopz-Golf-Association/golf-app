import { Radio, Group } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';

function NumPlayers({
  numPlayers,
  setNumPlayers,
}: {
  numPlayers: string | undefined;
  setNumPlayers: Dispatch<SetStateAction<string | undefined>>;
}) {
  return (
    <>
      <Radio.Group
        name="favoriteFramework"
        label="How Many Players?"
        value={numPlayers}
        onChange={setNumPlayers}
      >
        <Group /*justify="center"*/ mt="xs">
          <Radio value="2" label="2" />
          <Radio value="3" label="3" />
          <Radio value="4" label="4" />
        </Group>
      </Radio.Group>
    </>
  );
}
export { NumPlayers };
