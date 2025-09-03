import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './Collapsible';

describe('Collapsible', () => {
  test('toggles content visibility when trigger is clicked', async () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    );

    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Toggle'));
    expect(await screen.findByText('Hidden content')).toBeInTheDocument();
  });
});
