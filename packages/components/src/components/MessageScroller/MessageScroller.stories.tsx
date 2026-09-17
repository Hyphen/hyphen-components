import React, { useEffect, useRef, useState } from 'react';
import type { Meta } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { Message } from '../Message/Message';
import { MessageScroller } from './MessageScroller';

export default {
  title: 'Components/MessageScroller',
  component: MessageScroller,
} as Meta<typeof MessageScroller>;

export const AnchoredConversation = () => {
  const [turn, setTurn] = useState(0);
  const [reply, setReply] = useState('');
  const [older, setOlder] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => () => clearInterval(timer.current), []);
  const send = () => {
    clearInterval(timer.current);
    setTurn((value) => value + 1);
    setReply('');
    let count = 0;
    timer.current = setInterval(() => {
      setReply(
        (text) =>
          `${text}The deployment is healthy and all instances are serving traffic. `
      );
      if (++count === 20) clearInterval(timer.current);
    }, 100);
  };
  return (
    <Box width="100" maxWidth="600px" gap="lg">
      <MessageScroller defaultScrollPosition="end">
        <Box position="relative">
          <MessageScroller.Viewport
            height="360px"
            padding="xl"
            borderWidth="sm"
            radius="md"
          >
            <MessageScroller.Content>
              {older && (
                <MessageScroller.Item messageId="older">
                  <Box height="200px">Earlier history</Box>
                </MessageScroller.Item>
              )}
              <MessageScroller.Item messageId="initial" scrollAnchor>
                <Message align="end">
                  <Message.Content
                    background="secondary"
                    padding="xl"
                    radius="md"
                  >
                    How is the deployment?
                  </Message.Content>
                </Message>
              </MessageScroller.Item>
              <MessageScroller.Item messageId="initial-reply">
                <Box height="400px">Here is the deployment report.</Box>
              </MessageScroller.Item>
              {Array.from({ length: turn }, (_, index) => (
                <MessageScroller.Item
                  key={index}
                  messageId={`turn-${index}`}
                  scrollAnchor
                >
                  <Message align="end">
                    <Message.Content
                      background="secondary"
                      padding="xl"
                      radius="md"
                    >
                      Check again.
                    </Message.Content>
                  </Message>
                  {index < turn - 1 && (
                    <Box padding="xl 0">The previous check is complete.</Box>
                  )}
                </MessageScroller.Item>
              ))}
              {turn > 0 && (
                <MessageScroller.Item messageId="stream">
                  <Message>
                    <Message.Content>{reply || 'Checking…'}</Message.Content>
                  </Message>
                </MessageScroller.Item>
              )}
            </MessageScroller.Content>
          </MessageScroller.Viewport>
          <Box position="absolute" style={{ bottom: 12, right: 12 }}>
            <MessageScroller.Button />
          </Box>
        </Box>
        <Box direction="row" gap="md">
          <Button onClick={send}>Send prompt</Button>
          <Button variant="secondary" onClick={() => setOlder(true)}>
            Load earlier
          </Button>
        </Box>
      </MessageScroller>
    </Box>
  );
};
