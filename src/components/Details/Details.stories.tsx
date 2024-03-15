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

export const BasicUsage = () =>
  (() => {
    const { isOpen, handleToggle } = useOpenClose();
    return (
      <Details isOpen={isOpen}>
        <Details.Summary
          isDetailsOpen={isOpen}
          onToggle={handleToggle}
          display="inline"
        >
          What is Palmetto's Mission?
        </Details.Summary>
        <Box padding="md 0" gap="sm">
          <Box fontSize="lg" as="h4">
            Leading the World Towards a Clean Energy Future
          </Box>
          <Box as="p">
            We are on a mission to stop climate change before we reach an
            irreversible tipping point. Yes, this requires large shifts by
            entire nations and entire populations. It requires urgency and
            change on a massive scale. But technological advancements have put
            it within reach.
          </Box>
        </Box>
      </Details>
    );
  })();

export const CustomSummary = () =>
  (() => {
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
  })();

export const Opened = () =>
  (() => {
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
  })();
