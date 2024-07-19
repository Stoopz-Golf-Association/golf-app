import { useNavigate } from 'react-router-dom';
import { Stack, Button, Group } from '@mantine/core';
import { NumPlayers } from '../components/NumPlayers';
import { SelectPlayers } from '../components/SelectPlayers';
import { PlayerScores } from '../components/PlayerScores';
import { useState } from 'react';
import GolfCourse from '../components/GolfCourse';
import InputDate from '../components/InputDate';

import axios from 'axios';

function InputScore() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [numPlayers, setNumPlayers] = useState<string>();
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [playerScores, setPlayerScores] = useState<{ [key: string]: string }>();
  const [golfCourse, setGolfCourse] = useState<{ value: string; id: number }>({
    value: '',
    id: 0,
  });
  const [date, setDate] = useState<Date | null>(null);

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
        return {
          player: player,
          score: playerScores?.[player],
          golfCourseId: golfCourse.id,
          date: date,
        };
      });

      console.log(payload);
      await axios.post('/.netlify/functions/postScores', payload);
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
    if (step === 3 && playerNames.length === Number(numPlayers)) {
      setStep((prevStep) => prevStep + 1);
    }
    if (step === 4 && playerNames.length === Number(numPlayers)) {
      setStep((prevStep) => prevStep + 1);
    }
  };
  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };
  return (
    <>
      <Stack align="center">
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

        {step === 4 && (
          <GolfCourse golfCourse={golfCourse} setGolfCourse={setGolfCourse} />
        )}
        {step === 5 && <InputDate date={date} setDate={setDate} />}

        <Group justify="center">
          {step !== 1 && (
            <Button color="#01457a" variant="outline" onClick={handleBack}>
              back
            </Button>
          )}

          {step < 5 && (
            <Button color="#01457a" variant="filled" onClick={handleNext}>
              Next
            </Button>
          )}

          {step === 5 && (
            <Button color="#01457a" variant="filled" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Group>
      </Stack>
    </>
  );
}

export default InputScore;
