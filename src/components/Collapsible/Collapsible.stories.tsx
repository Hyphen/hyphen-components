import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './Collapsible';
import { Button } from '../Button/Button';
import { Box } from '../Box/Box';
import { userEvent, within, expect } from 'storybook/test';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Uncontrolled = () => (
  <Collapsible>
    <CollapsibleTrigger asChild>
      <Button variant="primary">Can I use this in my project?</Button>
    </CollapsibleTrigger>
    <CollapsibleContent>
      Yes. Free to use for personal and commercial projects. No attribution
      required.
    </CollapsibleContent>
  </Collapsible>
);

export function Controlled() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="display-flex flex-direction-column g-sm w-9xl"
    >
      <Box
        alignItems="center"
        justifyContent="space-between"
        padding="sm 0"
        direction="row"
      >
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button
            variant="tertiary"
            iconPrefix={isOpen ? 'remove' : 'caret-up-down'}
            size="sm"
            aria-label="toggle"
          />
        </CollapsibleTrigger>
      </Box>
      <Box
        fontFamily="monospace"
        radius="sm"
        padding="md"
        fontSize="sm"
        borderWidth="sm"
        borderColor="default"
      >
        @radix-ui/primitives
      </Box>
      <CollapsibleContent className="display-flex flex-direction-column g-sm">
        <Box
          fontFamily="monospace"
          radius="sm"
          padding="md"
          fontSize="sm"
          borderWidth="sm"
          borderColor="default"
        >
          @radix-ui/colors
        </Box>
        <Box
          fontFamily="monospace"
          radius="sm"
          padding="md"
          fontSize="sm"
          borderWidth="sm"
          borderColor="default"
        >
          @stitches/react
        </Box>
      </CollapsibleContent>
    </Collapsible>
  );
}

export const ClickOpenCollapsible: Story = {
  play: async ({ canvasElement, mount }) => {
    await mount(<Controlled />);
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByLabelText('toggle'));

    await expect(canvas.getByText('@radix-ui/colors')).toBeInTheDocument();
  },
};
