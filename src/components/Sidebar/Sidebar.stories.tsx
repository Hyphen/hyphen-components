import React from 'react';
import { Meta } from '@storybook/react';
import { SidebarProvider, Sidebar } from './Sidebar';
import { allModes } from '../../modes';
import { Box } from '../Box/Box';
import { Card } from '../Card/Card';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    overrideDecorator: true,
    chromatic: {
      modes: {
        light: allModes['light'],
        dark: allModes['dark'],
      },
    },
  },
};

export default meta;

// type Story = StoryObj<typeof Sidebar>;

export const SidebarExample = () => {
  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="none">
        hello
      </Sidebar>
      <Box padding="2xl" width="100">
        <Card height="100" padding="2xl">
          content
        </Card>
      </Box>
    </SidebarProvider>
  );
};
