import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './Tooltip';

describe('Tooltip', () => {
  test('renders content when open', () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const content = screen.getByText('Tip content');
    expect(content).toBeInTheDocument();
  });
});
