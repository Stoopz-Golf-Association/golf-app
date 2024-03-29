import { useNavigate } from 'react-router-dom';
import { Stack, Button, Group } from '@mantine/core';
import { NumPlayers } from '../components/NumPlayers';
import { SelectPlayers } from '../components/SelectPlayers';
import { PlayerScores } from '../components/PlayerScores';
import { useState } from 'react';
import axios from 'axios';

function InputScore() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [numPlayers, setNumPlayers] = useState<string>();
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [playerScores, setPlayerScores] = useState<{ [key: string]: string }>();

  const handleSubmit = async () => {
    let isValid = true;
    for (const player in playerScores) {
      const input = playerScores[player];
      if (!Number(input) || Number(input) < 55 || Number(input) > 150) {
        isValid = false;
      }
    }
    if (isValid) {
      const payload = Object.keys(playerScores || {}).map((player) => {
        return { player: player, score: playerScores?.[player] };
      });
      await axios.post(`/.netlify/functions/postScores `, payload);
      navigate('/');
    }
  };

  const handleNext = () => {
    if (step === 1 && numPlayers) {
      setStep((prevStep) => prevStep + 1);
    }
    if (step === 2 && playerNames.length === Number(numPlayers)) {
      setStep((prevStep) => prevStep + 1);
    }
  };
  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };
  return (
    <>
      <Stack h={300} bg="var(--mantine-color-body)" align="center">
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
            <Button variant="filled" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Group>
      </Stack>
    </>
  );
}

export default InputScore;
