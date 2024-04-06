import { Alert } from './Alert';
import { AlertVariant } from './Alert.types';
import { Button } from '../Button/Button';

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
