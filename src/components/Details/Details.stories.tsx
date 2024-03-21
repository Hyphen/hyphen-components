import { Details } from './Details';
import type { Meta } from '@storybook/react';
import React from 'react';
import { Box } from '../Box/Box';
import { useOpenClose } from '../../hooks/useOpenClose/useOpenClose';

const meta: Meta<typeof Details> = {
  title: 'Components/Details',
  component: Details,
};

export default meta;

export const BasicUsage = () => {
  const { isOpen, handleToggle } = useOpenClose();
  return (
    <Details isOpen={isOpen}>
      <Details.Summary
        isDetailsOpen={isOpen}
        onToggle={handleToggle}
        display="inline"
      >
        What is Hyphen's Mission?
      </Details.Summary>
      <Box padding="md 0" gap="sm">
        <Box fontSize="lg" as="h4">
          Empowering Teams with Streamlined DevOps
        </Box>
        <Box as="p">
          Our mission is to streamline DevOps for software teams. By automating
          access management and integrating essential tools, we empower teams to
          focus on innovation and deliver seamless software solutions
          efficiently.
        </Box>
      </Box>
    </Details>
  );
};

export const CustomSummary = () => {
  const { isOpen, handleToggle } = useOpenClose();
  return (
    <Details isOpen={isOpen}>
      <Details.Summary
        fontWeight="bold"
        color="primary-500"
        hover={{ color: 'primary-600' }}
        isDetailsOpen={isOpen}
        onToggle={handleToggle}
      >
        Do you have my reservation?
      </Details.Summary>
      <Box padding="md 0" as="p">
        See, you know how to take the reservation, you just don't know how to
        hold the reservation and that's really the most important part of the
        reservation, the holding. Anybody can just take them.
      </Box>
    </Details>
  );
};

export const Opened = () => {
  const { isOpen, handleToggle } = useOpenClose({ defaultIsOpen: true });
  return (
    <Details isOpen={isOpen}>
      <Details.Summary
        fontWeight="bold"
        color="primary-500"
        hover={{ color: 'primary-600' }}
        isDetailsOpen={isOpen}
        onToggle={handleToggle}
      >
        Do you have my reservation?
      </Details.Summary>
      <Box padding="md 0" as="p">
        See, you know how to take the reservation, you just don't know how to
        hold the reservation and that's really the most important part of the
        reservation, the holding. Anybody can just take them.
      </Box>
    </Details>
  );
};
