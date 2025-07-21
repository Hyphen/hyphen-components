import React from 'react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipPortal,
} from './Tooltip';
import type { Meta } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export default meta;

export const BasicUsage = () => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover</Button>
      </TooltipTrigger>
      <TooltipContent>This is the tooltip content</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const WithPortal = () => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Tooltip in Portal</Button>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent>This is the tooltip content</TooltipContent>
      </TooltipPortal>
    </Tooltip>
  </TooltipProvider>
);

export const BadgeTooltip = () => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge as="button" message="hover" variant="blue" />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent>This is the tooltip content</TooltipContent>
      </TooltipPortal>
    </Tooltip>
  </TooltipProvider>
);
