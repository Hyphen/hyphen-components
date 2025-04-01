import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Uncontrolled = () => (
  <ToggleGroup type="single" defaultValue="option2">
    <ToggleGroupItem value="option1">99%</ToggleGroupItem>
    <ToggleGroupItem value="option2">99.9%</ToggleGroupItem>
    <ToggleGroupItem value="option3">99.99%</ToggleGroupItem>
    <ToggleGroupItem value="option4">99.999%</ToggleGroupItem>
  </ToggleGroup>
);

export const Controlled = () => {
  const [value, setValue] = React.useState('option1');

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <ToggleGroup type="single" value={value} onValueChange={handleValueChange}>
      <ToggleGroupItem value="option1">99%</ToggleGroupItem>
      <ToggleGroupItem value="option2">99.9%</ToggleGroupItem>
      <ToggleGroupItem value="option3">99.99%</ToggleGroupItem>
      <ToggleGroupItem value="option4">99.999%</ToggleGroupItem>
    </ToggleGroup>
  );
};

export const Outlined = () => (
  <ToggleGroup type="single" variant="outline" defaultValue="option1">
    <ToggleGroupItem value="option1">99%</ToggleGroupItem>
    <ToggleGroupItem value="option2">99.9%</ToggleGroupItem>
    <ToggleGroupItem value="option3">99.99%</ToggleGroupItem>
    <ToggleGroupItem value="option4">99.999%</ToggleGroupItem>
  </ToggleGroup>
);

export const Disabled = () => (
  <ToggleGroup type="single" disabled variant="outline">
    <ToggleGroupItem value="option1">99%</ToggleGroupItem>
    <ToggleGroupItem value="option2">99.9%</ToggleGroupItem>
    <ToggleGroupItem value="option3">99.99%</ToggleGroupItem>
    <ToggleGroupItem value="option4">99.999%</ToggleGroupItem>
  </ToggleGroup>
);
