import React from 'react';
import type { Meta } from '@storybook/react';

import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';
import { Box } from '../Box/Box';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
};

export default meta;

export const Uncontrolled = () => (
  <ToggleGroup type="single" defaultValue="option2">
    <ToggleGroupItem value="option1">99%</ToggleGroupItem>
    <ToggleGroupItem value="option2">99.9%</ToggleGroupItem>
    <ToggleGroupItem value="option3">99.99%</ToggleGroupItem>
    <ToggleGroupItem value="option4">99.999%</ToggleGroupItem>
  </ToggleGroup>
);

export const Multiple = () => (
  <ToggleGroup type="multiple">
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
  <ToggleGroup type="single" disabled>
    <ToggleGroupItem value="option1">99%</ToggleGroupItem>
    <ToggleGroupItem value="option2">99.9%</ToggleGroupItem>
    <ToggleGroupItem value="option3">99.99%</ToggleGroupItem>
    <ToggleGroupItem value="option4">99.999%</ToggleGroupItem>
  </ToggleGroup>
);

export const BackgroundTest = () => (
  <>
    <Box background="primary" padding="2xl">
      <ToggleGroup type="single" defaultValue="option2">
        <ToggleGroupItem value="option1">99%</ToggleGroupItem>
        <ToggleGroupItem value="option2">99.9%</ToggleGroupItem>
        <ToggleGroupItem value="option3">99.99%</ToggleGroupItem>
        <ToggleGroupItem value="option4">99.999%</ToggleGroupItem>
        <ToggleGroupItem value="disabled" disabled>
          disabled
        </ToggleGroupItem>
      </ToggleGroup>
    </Box>
    <Box background="secondary" padding="2xl">
      <ToggleGroup type="single" defaultValue="option2">
        <ToggleGroupItem value="option1">99%</ToggleGroupItem>
        <ToggleGroupItem value="option2">99.9%</ToggleGroupItem>
        <ToggleGroupItem value="option3">99.99%</ToggleGroupItem>
        <ToggleGroupItem value="option4">99.999%</ToggleGroupItem>
        <ToggleGroupItem value="disabled" disabled>
          disabled
        </ToggleGroupItem>
      </ToggleGroup>
    </Box>
    <Box background="tertiary" padding="2xl">
      <ToggleGroup type="single" defaultValue="option2">
        <ToggleGroupItem value="option1">99%</ToggleGroupItem>
        <ToggleGroupItem value="option2">99.9%</ToggleGroupItem>
        <ToggleGroupItem value="option3">99.99%</ToggleGroupItem>
        <ToggleGroupItem value="option4">99.999%</ToggleGroupItem>
        <ToggleGroupItem value="disabled" disabled>
          disabled
        </ToggleGroupItem>
      </ToggleGroup>
    </Box>
  </>
);
