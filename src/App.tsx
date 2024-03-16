import "./App.css";
import { Center, Button, Group } from "@mantine/core";
import { useState } from "react";
import { NumPlayers } from "./components/NumPlayers";
import { SelectPlayers } from "./components/SelectPlayers";
import { PlayerScores } from "./components/PlayerScores";
import { PlayerTable } from "./components/PlayerTable";

function App() {
  const [step, setStep] = useState(1);
  const [numPlayers, setNumPlayers] = useState<string>();
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [playerScores, setPlayerScores] = useState<{ [key: string]: string }>();

  const handleNext = () => {
    if (step === 1 && numPlayers) {
      setStep((prevStep) => prevStep + 1);
    }
    if (step === 2 && playerNames.length === Number(numPlayers)) {
      setStep((prevStep) => prevStep + 1);
    }
    if (step === 3) {
      let isValid = true;
      for (const player in playerScores) {
        const input = playerScores[player];
        if (!Number(input) || Number(input) < 55 || Number(input) > 150) {
          isValid = false;
        }
      }
      if (isValid) setStep((prevStep) => prevStep + 1);
    }
  };
  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };
  return (
    <>
      {step === 1 && (
        <NumPlayers numPlayers={numPlayers} setNumPlayers={setNumPlayers} />
      )}
      {step === 2 && (
        <SelectPlayers
          numPlayers={numPlayers}
          playerNames={playerNames}
          setPlayerNames={setPlayerNames}
        />
      )}

      {step === 3 && (
        <PlayerScores
          playerNames={playerNames}
          playerScores={playerScores}
          setPlayerScores={setPlayerScores}
        />
      )}

      {step === 4 && <PlayerTable playerScores={playerScores} />}

      <Center maw={400} h={50}>
        <Group justify="center">
          {step !== 1 && (
            <Button variant="outline" onClick={handleBack}>
              back
            </Button>
          )}

          {step < 3 && (
            <Button variant="filled" onClick={handleNext}>
              Next
            </Button>
          )}

          {step === 3 && (
            <Button variant="filled" onClick={handleNext}>
              Submit
            </Button>
          )}
        </Group>
      </Center>
    </>
  );
}

export default App;
