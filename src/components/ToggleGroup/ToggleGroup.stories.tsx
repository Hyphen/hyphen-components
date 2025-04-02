import React from 'react';
import type { Meta } from '@storybook/react';

import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';
import { Box } from '../Box/Box';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Tooltip/Tooltip';

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

export const CustomLabel = () => (
  <TooltipProvider delayDuration={0}>
    <ToggleGroup
      type="single"
      gap="lg"
      defaultValue="option2"
      variant="outline"
    >
      <ToggleGroupItem value="option1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Box textAlign="left" alignItems="flex-start" gap="xs">
              <Box fontSize="xl" fontWeight="semibold">
                99%
              </Box>
              <Box color="tertiary" fontSize="xs">
                Standard
              </Box>
            </Box>
          </TooltipTrigger>
          <TooltipContent sideOffset={10}>
            Up to 3.65 days/year downtime
          </TooltipContent>
        </Tooltip>
      </ToggleGroupItem>
      <ToggleGroupItem value="option2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Box textAlign="left" alignItems="flex-start" gap="xs">
              <Box fontSize="xl" fontWeight="semibold">
                99.9%
              </Box>
              <Box
                color="tertiary"
                fontSize="xs"
                direction="row"
                alignItems="center"
                gap="sm"
              >
                High
              </Box>
            </Box>
          </TooltipTrigger>
          <TooltipContent sideOffset={10}>
            Up to 8.76 hours/year downtime
          </TooltipContent>
        </Tooltip>
      </ToggleGroupItem>
      <ToggleGroupItem value="option3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Box textAlign="left" alignItems="flex-start" gap="xs">
              <Box fontSize="xl" fontWeight="semibold">
                99.99%
              </Box>
              <Box color="tertiary" fontSize="xs">
                Very High
              </Box>
            </Box>
          </TooltipTrigger>
          <TooltipContent sideOffset={10}>
            Up to 52.56 minutes/year downtime
          </TooltipContent>
        </Tooltip>
      </ToggleGroupItem>
      <ToggleGroupItem value="option4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Box textAlign="left" alignItems="flex-start" gap="xs">
              <Box fontSize="xl" fontWeight="semibold">
                99.999%
              </Box>
              <Box color="tertiary" fontSize="xs">
                Mission Critical
              </Box>
            </Box>
          </TooltipTrigger>
          <TooltipContent sideOffset={10}>
            Up to 5.26 minutes/year downtime
          </TooltipContent>
        </Tooltip>
      </ToggleGroupItem>
    </ToggleGroup>
  </TooltipProvider>
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
