import React from 'react';
import type { Meta } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { Spinner } from '../Spinner/Spinner';
import { allModes } from '../../modes';
import { Marker } from './Marker';

export default {
  title: 'Components/Marker',
  component: Marker,
  parameters: {
    chromatic: { modes: { light: allModes.light, dark: allModes.dark } },
  },
} as Meta<typeof Marker>;

export const Variants = () => (
  <Box width="100" maxWidth="600px" gap="xl">
    <Marker>
      <Marker.Content>Riley joined the conversation</Marker.Content>
    </Marker>
    <Marker variant="border">
      <Marker.Content>Deployment report updated</Marker.Content>
    </Marker>
    <Marker variant="separator">
      <Marker.Content>Today</Marker.Content>
    </Marker>
  </Box>
);

export const StatusAndIcons = () => (
  <Box width="100" maxWidth="600px" gap="xl">
    <Marker role="status">
      <Marker.Icon>
        <Spinner size="sm" />
      </Marker.Icon>
      <Marker.Content>Checking deployment health…</Marker.Content>
    </Marker>
    <Marker>
      <Marker.Icon>✓</Marker.Icon>
      <Marker.Content>All instances are healthy</Marker.Content>
    </Marker>
  </Box>
);

export const LinksAndButtons = () => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <Box width="100" maxWidth="600px" gap="xl">
      <Marker as="a" href="#marker-report">
        <Marker.Content>View deployment report</Marker.Content>
      </Marker>
      <Marker
        as="button"
        type="button"
        aria-expanded={expanded}
        aria-controls="marker-report"
        onClick={() => setExpanded(!expanded)}
      >
        <Marker.Content>
          {expanded ? 'Hide' : 'Show'} deployment details
        </Marker.Content>
      </Marker>
      <Box id="marker-report">
        {expanded && 'All 4 instances passed their health checks.'}
      </Box>
    </Box>
  );
};

export const LongLabels = () => (
  <Box width="100" maxWidth="320px" gap="xl">
    <Marker variant="separator">
      <Marker.Content>
        Earlier messages from the deployment review on Thursday, September 17
      </Marker.Content>
    </Marker>
    <Marker variant="border">
      <Marker.Icon>✓</Marker.Icon>
      <Marker.Content>
        deployment-production-eu-west-application-worker-health-check-completed-successfully
      </Marker.Content>
    </Marker>
  </Box>
);
