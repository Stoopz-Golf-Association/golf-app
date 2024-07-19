import React from 'react';
import { DateInput } from '@mantine/dates';

interface DateInputProps {
  date: Date | null;
  setDate: (value: Date | null) => void;
}

const InputDate: React.FC<DateInputProps> = ({ date, setDate }) => {
  return (
    <DateInput
      value={date}
      onChange={setDate}
      label="Date of Round"
      placeholder="Input Date"
    />
  );
};

export default InputDate;
