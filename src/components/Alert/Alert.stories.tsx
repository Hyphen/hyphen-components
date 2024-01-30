import { Alert } from './Alert';
import { AlertVariant } from './Alert.types';
import { Button } from '../Button/Button';
import { Heading } from '../Heading/Heading';
import type { Meta } from '@storybook/react';
import React from 'react';
import { useState } from 'react';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
};

export default meta;

export const Overview = () => (
  <Alert
    title="Contact Created"
    message="The contact was saved on December 3, 2020 at 6:10pm PDT"
    variant="success"
    isClosable
    hasIcon
  />
);
export const Variants = () =>
  (() => {
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
            message={message(variant)}
            key={variant}
            title={variant.charAt(0).toUpperCase() + variant.slice(1)}
            variant={variant}
            hasIcon
            className="m-bottom-md"
          />
        ))}
      </>
    );
  })();

export const CustomJSX = () =>
  (() => {
    const myMessage = (
      <>
        <Heading as="h3" size="xl">
          Oops!
        </Heading>
        <p>Looks like something went wrong.</p>

        <Button size="sm" className="m-top-sm">
          Click this button to fix it!
        </Button>
      </>
    );
    return <Alert message={myMessage} variant="danger" />;
  })();

export const RenderProp = () =>
  (() => {
    const renderMyMessage = () => (
      <>
        <Heading as="h3" size="xl">
          Oops!
        </Heading>
        <p>Looks like something went wrong. But I'm using a render function.</p>
        <Button size="sm" className="m-top-sm">
          Click this button to fix it!
        </Button>
      </>
    );
    return <Alert render={renderMyMessage} variant="danger" />;
  })();

export const Closable = () => {
  const [isAlertTwoShowing, setAlertTwoShowing] = useState(true);
  const [isAlertThreeShowing, setAlertThreeShowing] = useState(true);

  return (
    <>
      <Alert
        title="Won't Close"
        message="Closable, but with no onClose callback so nothing happens when clicked."
        variant="warning"
        isClosable
        className="m-bottom-md"
      />
      {isAlertTwoShowing ? (
        <Alert
          title="Closable"
          message="This one works!"
          variant="info"
          isClosable
          onClose={() => setAlertTwoShowing(false)}
          className="m-bottom-md"
        />
      ) : (
        <div className="m-bottom-md">
          <Button onClick={() => setAlertTwoShowing(true)} size="sm">
            Give me the second alert back!
          </Button>
        </div>
      )}
      {isAlertThreeShowing ? (
        <Alert
          message="With custom close text!"
          variant="info"
          isClosable
          onClose={() => setAlertThreeShowing(false)}
          closeText="Close me!"
        />
      ) : (
        <div className="m-bottom-md">
          <Button onClick={() => setAlertThreeShowing(true)} size="sm">
            Give me the third alert back!
          </Button>
        </div>
      )}
    </>
  );
};

export const Compact = () => (
  <Alert message="Compact Alerts have less padding" variant="info" isCompact />
);

export const CustomTheme = () => (
  <>
    <div
      style={
        {
          '--color-brand-info-50': '#CFC5E9',
          '--color-brand-info-500': '#603FB5',
          '--alert-border-width': '0',
        } as any
      }
    >
      <Alert
        message="Here we've overwritten base token values so that the alert inherits new values."
        title="Custom Theme"
        variant="info"
        hasIcon
        className="m-bottom-md"
      />
    </div>
    <div
      style={
        {
          '--alert-info-font-color': '#603FB5',
          '--alert-info-background-color': 'white',
          '--alert-info-icon-color': '#603FB5',
          '--alert-border-width': 'var(--size-border-xs)',
          '--alert-info-border-color': 'var(--alert-info-icon-color)',
        } as any
      }
    >
      <Alert
        message="Here we've overwritten ONLY the values for the 'info' alert variant so other components will be unaffected"
        title="Custom Theme"
        variant="info"
        hasIcon
        className="m-bottom-md"
      />
      <Alert
        message="An alert that uses default token values"
        variant="warning"
        title="Not Themed"
        hasIcon
      />
    </div>
  </>
);
