import Calendar from './Calendar';

import type { Meta } from '@storybook/react-vite';
import React from 'react';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

export const BasicUsage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return <Calendar mode="single" selected={date} onSelect={setDate} />;
};
