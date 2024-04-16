import { Card } from './Card';
import type { Meta } from '@storybook/react';
import React from 'react';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { Heading } from '../Heading/Heading';
import { TextInput } from '../TextInput/TextInput';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

export default meta;

export const DefaultCard = () => (
  <Card>
    <Card.Header title="Default Card" />
    <Card.Section>
      <p>Card content</p>
    </Card.Section>
    <Card.Footer>Footer</Card.Footer>
  </Card>
);

export const ExampleSignUpForm = () => (
  <Box
    alignItems="center"
    alignContent="center"
    padding="2xl"
    background="grey-50"
  >
    <Card maxWidth="4xl">
      <Card.Section padding="3xl">
        <Box gap="xl">
          <Box gap="sm" alignItems="center">
            <Heading as="h1" size="xl">
              Sign Up
            </Heading>
            <Box as="p" color="secondary" fontSize="sm">
              Create your Hyphen account
            </Box>
          </Box>
          <Box gap="lg">
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
        </Box>
      </Card.Section>
    </Card>
  </Box>
);

export const ExampleFullBleedPhotos = () => (
  <>
    <Card width="300px">
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
