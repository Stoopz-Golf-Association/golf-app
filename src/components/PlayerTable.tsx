type Props = {
  playerScores: { [key: string]: string } | undefined;
};

function PlayerTable({ playerScores }: Props) {
  return Object.entries(playerScores || {}).map(([player, score]) => {
    return (
      <div>
        {player} | {score}
      </div>
    );
  });
}
export { PlayerTable };
