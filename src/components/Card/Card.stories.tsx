import { Card } from './Card';
import { Table } from '../Table/Table';
import { Box, Button, TextInput } from '../../index';
import type { Meta } from '@storybook/react';
import React from 'react';
import { Heading } from '../../index';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

export default meta;

export const Overview = () => (
  <Box background="grey-lightest" padding="2xl">
    <Card>
      <Card.Header title="Profile Card Example">
        <Box as="p" color="grey" fontSize="sm">
          Personal and Contact Details
        </Box>
      </Card.Header>
      <Box overflow="hidden" height="130px">
        <img src="https://images.unsplash.com/photo-1555412654-72a95a495858?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" />
      </Box>
      <Card.Section title="profile">
        <Box direction="row" gap="lg">
          <Box flex="auto" gap="lg">
            <Box gap="2xs">
              <Box fontSize="sm" color="grey">
                Full Name
              </Box>
              <Box>Jessica Ramirez</Box>
            </Box>
            <Box gap="2xs">
              <Box fontSize="sm" color="grey">
                Email
              </Box>
              <Box>jw1416@palmetto.com</Box>
            </Box>
            <Box gap="2xs">
              <Box fontSize="sm" color="grey">
                Phone
              </Box>
              <Box>(123) 555-5555</Box>
            </Box>
          </Box>
          <Box flex="auto" gap="lg">
            <Box gap="2xs">
              <Box fontSize="sm" color="grey">
                Preferred Language
              </Box>
              <Box>English</Box>
            </Box>
            <Box gap="2xs">
              <Box fontSize="sm" color="grey">
                Country
              </Box>
              <Box>United States</Box>
            </Box>
          </Box>
        </Box>
      </Card.Section>
      <Card.Section title="site location">
        <Box gap="2xs">
          <Box>12345 Jones Rd</Box>
          <Box>Seattle, WA 98123</Box>
        </Box>
      </Card.Section>
      <Card.Footer>
        <Box
          display="flex"
          direction="row"
          justify="between"
          overflow="hidden"
          gap="md"
        >
          <Box direction="row" gap="sm">
            <Button size="sm" variant="primary">
              Edit
            </Button>
            <Button size="sm" variant="primary">
              Remove
            </Button>
          </Box>
          <Button variant="primary-danger">Delete</Button>
        </Box>
      </Card.Footer>
    </Card>
  </Box>
);

export const DefaultCard = () => (
  <Card>
    <Card.Header title="Default Card" />
    <Card.Section>
      <p>Card content</p>
    </Card.Section>
    <Card.Footer>Footer</Card.Footer>
  </Card>
);

export const SubduedCard = () => (
  <Card subdued>
    <Card.Header title="Subdued Card" />
    <Card.Section>
      <p>Card content</p>
    </Card.Section>
  </Card>
);

export const CardHeader = () => (
  <Card>
    <Card.Header title="Default Card">
      This is a good place for card description text
    </Card.Header>
    <Card.Section>
      <p>Card content</p>
    </Card.Section>
  </Card>
);

export const CardSection = () => (
  <Card>
    <Card.Header title="Card Title" />
    <Card.Section title="Section Title">
      <p>Section content</p>
    </Card.Section>
  </Card>
);

export const MultipleSections = () => (
  <Card>
    <Card.Header title="Card with Multiple Sections" />
    <Card.Section title="Section A Title">
      <p>Section content</p>
    </Card.Section>
    <Card.Section title="Section B Title">
      <p>Section content</p>
    </Card.Section>
    <Card.Section>
      <p>Section c has no title</p>
    </Card.Section>
  </Card>
);

export const SubduedSection = () => (
  <Card>
    <Card.Header title="Card with Subdued Section" />
    <Card.Section subdued>
      <Box as="p">Subdued section</Box>
    </Card.Section>
    <Card.Section>
      <Box as="p">Another section that is not subdued</Box>
    </Card.Section>
  </Card>
);

export const CardFooter = () => (
  <Card>
    <Card.Section>content</Card.Section>
    <Card.Footer>
      <Button variant="primary">Publish</Button>
    </Card.Footer>
  </Card>
);

export const ExampleSignUpForm = () => (
  <Box
    alignItems="center"
    alignContent="center"
    padding="2xl"
    background="grey-lightest"
  >
    <Card maxWidth="4xl">
      <Card.Section padding="3xl">
        <Box gap="xl">
          <Box gap="sm" alignItems="center">
            <Heading as="h1" size="xl">
              Sign Up
            </Heading>
            <Box as="p" color="grey" fontSize="sm">
              Create your account to create leads and proposals
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
          <Box alignItems="center" fontSize="sm" color="grey">
            <p>
              Already have an account?{' '}
              <a href="#" className="font-color-primary">
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

export const ExampleCardWithTable = () => () => {
  const columnConfig = [
    { heading: 'ID', dataKey: 'id' },
    { heading: 'Color', dataKey: 'color' },
    { heading: 'Flavor', dataKey: 'flavor' },
  ];
  const tableData = [
    { id: 1, color: 'red', flavor: 'vanilla' },
    { id: 2, color: 'blue', flavor: 'chocolate' },
    { id: 3, color: 'green', flavor: 'strawberry' },
  ];
  return (
    <Card>
      <Card.Header title="Flavor Table" />
      <Card.Section padding="0">
        <Table rowKey="id" columns={columnConfig} rows={tableData} />
      </Card.Section>
    </Card>
  );
};
