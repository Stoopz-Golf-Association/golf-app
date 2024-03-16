import { MultiSelect } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

type Props = {
  numPlayers: string | undefined;
  playerNames: string[];
  setPlayerNames: Dispatch<SetStateAction<string[]>>;
};

function SelectPlayers({ numPlayers, playerNames, setPlayerNames }: Props) {
  return (
    <MultiSelect
      label="Select Players"
      placeholder="Select Players"
      data={["Sam", "JP", "Boosh", "Boux"]}
      maxValues={Number(numPlayers)}
      value={playerNames}
      onChange={setPlayerNames}
    />
  );
}
export { SelectPlayers };
