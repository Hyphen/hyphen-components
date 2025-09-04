import React, { useState } from 'react';
import type { Meta } from '@storybook/react-vite';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
};

export default meta;

export const Basic = () => {
  const [selected, setSelected] = useState<Date>();
  return <DatePicker selected={selected} onSelect={setSelected} />;
};
