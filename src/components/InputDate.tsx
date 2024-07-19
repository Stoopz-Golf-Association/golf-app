import React from 'react';
import { DateInput } from '@mantine/dates';
import dayjs from 'dayjs';

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
      maxDate={dayjs(new Date()).add(0, 'day').toDate()}
      clearable
      defaultValue={new Date()}
    />
  );
};

export default InputDate;
