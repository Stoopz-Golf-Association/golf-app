import { useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { Table } from "@mantine/core";

type Props = {
  allPlayerScores: PlayerScore[];
  setAllPlayerScores: Dispatch<SetStateAction<PlayerScore[]>>;
};
export type PlayerScore = {
  player: string;
  score: string;
};

function PlayerTable({ allPlayerScores, setAllPlayerScores }: Props) {
  useEffect(() => {
    (async () => {
      const result = await axios.get(`/.netlify/functions/getScores `);
      setAllPlayerScores(result.data.scores);
    })();
  }, [setAllPlayerScores]);

  const rows = allPlayerScores.map((player) => (
    <Table.Tr>
      <Table.Td>{player.player}</Table.Td>
      <Table.Td>{player.score}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Player Name</Table.Th>
          <Table.Th>Score</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
export { PlayerTable };
