import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from './Popover';
import type { Meta } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../Button/Button';
import { Box } from '../Box/Box';
import { RadioGroup } from '../RadioGroup/RadioGroup';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
};

export default meta;

export const Basic = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="primary">Open Popover</Button>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent>
            <p>Hello world!</p>
          </PopoverContent>
        </PopoverPortal>
      </Popover>
    </>
  );
};

export const SidesAndAlign = () => {
  const [align, setAlign] = React.useState<'start' | 'center' | 'end'>(
    'center'
  );

  const options = [
    { id: 'start', value: 'start', label: 'Start' },
    { id: 'center', value: 'center', label: 'Center' },
    { id: 'end', value: 'end', label: 'End' },
  ];

  return (
    <Box gap="2xl">
      <Box>
        <Box direction="row" gap="md">
          <RadioGroup
            direction="row"
            title="Align"
            name="noTitleOrDescription"
            value={align}
            onChange={(event) =>
              setAlign(event.target.value as 'start' | 'center' | 'end')
            }
            options={options}
          />
        </Box>
      </Box>
      <Box direction="row" gap="2xl">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="primary">Top</Button>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent side="top" align={align}>
              <p>popover content</p>
            </PopoverContent>
          </PopoverPortal>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="primary">Right</Button>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent side="right" align={align}>
              <p>popover content</p>
            </PopoverContent>
          </PopoverPortal>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="primary">Bottom</Button>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent side="bottom" align={align}>
              <p>popover content</p>
            </PopoverContent>
          </PopoverPortal>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="primary">Left</Button>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent side="left" align={align}>
              <p>popover content</p>
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      </Box>
    </Box>
  );
};
