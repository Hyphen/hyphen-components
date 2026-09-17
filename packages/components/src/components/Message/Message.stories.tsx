import React from 'react';
import type { Meta } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { Message } from './Message';

export default { title: 'Components/Message', component: Message } as Meta<
  typeof Message
>;

export const Conversation = () => (
  <Box gap="2xl" maxWidth="600px">
    <Message align="end">
      <Message.Content maxWidth="80%">
        <Box background="secondary" radius="md" padding="xl">
          Can you check this deployment?
        </Box>
        <Message.Footer alignSelf="flex-end">10:42</Message.Footer>
      </Message.Content>
    </Message>
    <Message>
      <Message.Content>
        <Message.Header fontWeight="semibold">Hyphen</Message.Header>
        <Box>The deployment is healthy. All instances are serving traffic.</Box>
        <Message.Footer>10:43</Message.Footer>
      </Message.Content>
    </Message>
  </Box>
);
