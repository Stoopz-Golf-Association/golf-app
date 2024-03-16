import { Radio, Group, Center } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

function NumPlayers({
  numPlayers,
  setNumPlayers,
}: {
  numPlayers: string | undefined;
  setNumPlayers: Dispatch<SetStateAction<string | undefined>>;
}) {
  return (
    <>
      <Center maw={400} h={100} bg="var(--mantine-color-gray-light)">
        <Radio.Group
          name="favoriteFramework"
          label="How Many Players?"
          value={numPlayers}
          onChange={setNumPlayers}
          withAsterisk
        >
          <Group mt="xs">
            <Radio value="2" label="2" />
            <Radio value="3" label="3" />
            <Radio value="4" label="4" />
          </Group>
        </Radio.Group>
      </Center>
    </>
  );
}
export { NumPlayers };
