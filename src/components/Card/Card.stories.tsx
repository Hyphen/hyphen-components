import { Card } from './Card';
import type { Meta } from '@storybook/react';
import React from 'react';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { Heading } from '../Heading/Heading';
import { TextInput } from '../TextInput/TextInput';
import { allModes } from '../../modes';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light'],
        dark: allModes['dark'],
      },
    },
  },
};

export default meta;

export const OverviewCard = () => (
  <Card>
    <Card.Header title="Card Overview" description="This is the description">
      <Button size="sm">action</Button>
    </Card.Header>
    <Card.Section title="Section One">
      <p>Card content</p>
    </Card.Section>
    <Card.Section title="Section Two">Another section</Card.Section>
    <Card.Footer>Footer</Card.Footer>
  </Card>
);

export const ExampleSignUpForm = () => (
  <Box
    alignItems="center"
    alignContent="center"
    padding="2xl"
    background="secondary"
  >
    <Card maxWidth="9xl">
      <Card.Section padding="5xl" gap="4xl">
        <Box gap="sm" alignItems="center">
          <Heading as="h1" size="lg">
            Sign Up
          </Heading>
          <Box as="p" color="secondary" fontSize="sm">
            Create your Hyphen account
          </Box>
        </Box>
        <Box gap="2xl">
          <TextInput
            id="email"
            value=""
            label="Email Address"
            onChange={() => null}
          />
          <TextInput
            id="password"
            type="password"
            value=""
            label="Password"
            onChange={() => null}
          />
          <Button fullWidth variant="primary">
            Sign Up
          </Button>
        </Box>
        <Box alignItems="center" fontSize="sm" color="secondary">
          <p>
            Already have an account?{' '}
            <a href="/#" className="font-color-primary">
              Log in
            </a>
            .
          </p>
        </Box>
      </Card.Section>
    </Card>
  </Box>
);

export const ExampleFullBleedPhotos = () => (
  <>
    <Card maxWidth="9xl">
      <Card.Section padding="0" overflow="hidden" height="300px">
        <img
          src="https://images.unsplash.com/photo-1555412654-72a95a495858?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80"
          data-chromatic="ignore"
          alt=""
        />
      </Card.Section>
      <Card.Section childGap="xs">
        <Heading>Headline</Heading>
        <Box as="p">This is the body copy of the card.</Box>
      </Card.Section>
    </Card>
  </>
);
