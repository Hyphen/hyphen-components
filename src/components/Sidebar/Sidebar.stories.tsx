import React from 'react';
import { Meta } from '@storybook/react';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
} from './Sidebar';
import { allModes } from '../../modes';
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
      <Sidebar side="left" collapsible="offcanvas">
        hello
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <Card height="100" padding="2xl">
          content
        </Card>
      </SidebarInset>
    </SidebarProvider>
  );
};
