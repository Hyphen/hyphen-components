import React, { useState } from 'react';
import type { Meta } from '@storybook/react-vite';
import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
};

export default meta;

export const Basic = () => {
  const [selected, setSelected] = useState<Date>();
  return <Calendar selected={selected} onSelect={setSelected} />;
};
