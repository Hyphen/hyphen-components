import { Alert } from './Alert';
import { AlertVariant } from './Alert.types';
import { Button } from '../Button/Button';
import { ALERT_VARIANTS } from './Alert.constants';

import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { useState } from 'react';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: 'select',
      options: ALERT_VARIANTS,
      description: 'The type/color of the alert to show',
    },
    title: {
      control: 'text',
      description: 'The title for the alert',
    },
    message: {
      control: 'text',
      description:
        'The text message to be rendered in the alert (deprecated, use children instead)',
    },
    hasIcon: {
      control: 'boolean',
      description:
        'Whether the alert has an icon that corresponds to its variant',
    },
    isCompact: {
      control: 'boolean',
      description: 'Renders a version of the alert with smaller padding',
    },
    className: {
      control: 'text',
      description: 'Custom class to apply to the alert',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when alert is closed',
    },
  },
  args: {
    variant: 'default',
    hasIcon: false,
    isCompact: false,
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Overview: Story = {
  args: {
    title: 'Contact Created',
    variant: 'success',
    hasIcon: true,
    children: 'The contact was saved on December 3, 2020 at 6:10pm PDT',
  },
};

export const Compact: Story = {
  args: {
    title: 'Contact Created',
    variant: 'success',
    hasIcon: true,
    isCompact: true,
    children: 'The contact was saved on December 3, 2020 at 6:10pm PDT',
  },
};

export const WithCustomContent: Story = {
  args: {
    title: 'Custom Content',
    variant: 'info',
    hasIcon: true,
  },
  render: (args) => (
    <Alert {...args}>
      <p>
        This alert uses <strong>children</strong> for custom content. You can
        include any JSX content here, including <a href="/#">links</a>,{' '}
        <code>code snippets</code>, and more.
      </p>
    </Alert>
  ),
};

export const Variants: Story = {
  render: () => {
    const variants: AlertVariant[] = [
      'default',
      'info',
      'success',
      'warning',
      'danger',
    ];
    const message = (variant: AlertVariant) => `
        This is a ${variant} alert. It also has longer text to see what these alerts
        can look like when broken into multiple lines. This one will definitely
        break into multiple lines in most standard screen resolutions.
      `;
    return (
      <>
        {variants.map((variant: AlertVariant) => (
          <Alert
            key={variant}
            title={variant.charAt(0).toUpperCase() + variant.slice(1)}
            variant={variant}
            hasIcon
            className="m-bottom-md"
          >
            {message(variant)}
          </Alert>
        ))}
      </>
    );
  },
  parameters: {
    controls: { disable: true },
  },
};

export const ClosableAlert = () => {
  const [isAlertShowing, setIsAlertShowing] = useState(true);

  return (
    <>
      {isAlertShowing ? (
        <Alert
          title="Closable"
          variant="info"
          onClose={() => setIsAlertShowing(false)}
          className="m-bottom-md"
        >
          Try closing me.
        </Alert>
      ) : (
        <div className="m-bottom-md">
          <Button onClick={() => setIsAlertShowing(true)} size="sm">
            Give me the alert back!
          </Button>
        </div>
      )}
    </>
  );
};

export const Closable: Story = {
  render: () => ClosableAlert(),
  parameters: {
    controls: { disable: true },
  },
};
