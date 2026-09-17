import React from 'react';
import type { Meta } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { allModes } from '../../modes';
import { Message } from './Message';
import { Marker } from '../Marker/Marker';

export default {
  title: 'Components/Message',
  component: Message,
  parameters: {
    chromatic: { modes: { light: allModes.light, dark: allModes.dark } },
  },
} as Meta<typeof Message>;

export const Conversation = () => (
  <Box gap="2xl" maxWidth="600px">
    <Marker variant="separator">
      <Marker.Content>Today</Marker.Content>
    </Marker>
    <Message align="end">
      <Message.Content maxWidth="80%">
        <Box background="secondary" radius="md" padding="xl">
          Can you check this deployment?
        </Box>
        <Message.Footer>10:42</Message.Footer>
      </Message.Content>
    </Message>
    <Marker>
      <Marker.Icon>✓</Marker.Icon>
      <Marker.Content>Deployment check complete</Marker.Content>
    </Marker>
    <Message>
      <Message.Content>
        <Message.Header fontWeight="semibold">Hyphen</Message.Header>
        <Box>The deployment is healthy. All instances are serving traffic.</Box>
        <Message.Footer>10:43</Message.Footer>
      </Message.Content>
    </Message>
  </Box>
);

const DemoAvatar = ({ name, initials }: { name: string; initials: string }) => (
  <Box
    role="img"
    aria-label={name}
    width="32px"
    height="32px"
    radius="2xl"
    background="secondary"
    borderWidth="sm"
    alignItems="center"
    justifyContent="center"
    fontSize="xs"
    fontWeight="semibold"
  >
    {initials}
  </Box>
);
DemoAvatar.displayName = 'DemoAvatar';

/** The same composition on either side; align is the only layout difference. */
export const StartAndEndAlignment = () => (
  <Box gap="2xl" width="100" maxWidth="640px">
    <Marker variant="separator">
      <Marker.Content>Today</Marker.Content>
    </Marker>
    <Message align="start">
      <Message.Content maxWidth="80%">
        <Message.Header fontWeight="semibold">Riley · Received</Message.Header>
        <Box background="secondary" radius="md" padding="xl">
          The preview is ready for review.
        </Box>
        <Message.Footer>10:42</Message.Footer>
      </Message.Content>
    </Message>
    <Message align="end">
      <Message.Content maxWidth="80%">
        <Message.Header fontWeight="semibold">You · Sent</Message.Header>
        <Box background="secondary" radius="md" padding="xl">
          Thanks, I’ll check it now.
        </Box>
        <Message.Footer>10:43 · Delivered</Message.Footer>
      </Message.Content>
    </Message>
  </Box>
);

/** Expanding the footer proves the avatar follows the surface rather than the metadata. */
export const BottomAnchoredAvatars = () => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <Box gap="2xl" width="100" maxWidth="640px">
      <Marker variant="separator">
        <Marker.Content>Today</Marker.Content>
      </Marker>
      <Message align="start">
        <Message.Avatar>
          <DemoAvatar name="Riley" initials="RL" />
        </Message.Avatar>
        <Message.Content maxWidth="80%">
          <Message.Header fontWeight="semibold">Riley</Message.Header>
          <Box background="secondary" radius="md" padding="xl" gap="lg">
            <span>The preview is ready.</span>
            <span>
              I checked the desktop and mobile layouts. The updated navigation
              and settings are included.
            </span>
          </Box>
          <Message.Footer>10:42 · Edited</Message.Footer>
        </Message.Content>
      </Message>
      <Message align="end">
        <Message.Avatar>
          <DemoAvatar name="You" initials="NY" />
        </Message.Avatar>
        <Message.Content maxWidth="80%">
          <Message.Header fontWeight="semibold">You</Message.Header>
          <Box background="secondary" radius="md" padding="xl">
            Looks good. I’ve left a few notes for the team.
          </Box>
          <Message.Footer direction="column" alignItems="flex-end">
            <span>10:43 · Delivered</span>
            <Button
              variant="link"
              size="sm"
              aria-expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Hide delivery details' : 'Show delivery details'}
            </Button>
            {expanded && (
              <Box textAlign="right">
                Read by Riley and Morgan.
                <br />
                Last viewed today at 10:45.
              </Box>
            )}
          </Message.Footer>
        </Message.Content>
      </Message>
    </Box>
  );
};

/** Header identifies the sender; footer holds status and working message actions. */
export const HeaderAndFooter = () => {
  const [liked, setLiked] = React.useState(false);
  return (
    <Box width="100" maxWidth="640px" gap="2xl">
      <Marker variant="border">
        <Marker.Content>Riley updated the design review</Marker.Content>
      </Marker>
      <Message align="start">
        <Message.Avatar>
          <DemoAvatar name="Riley" initials="RL" />
        </Message.Avatar>
        <Message.Content maxWidth="80%">
          <Message.Header alignItems="center" wrap gap="md">
            <Box fontWeight="semibold">Riley Chen</Box>
            <Box color="tertiary" fontSize="xs">
              Design team
            </Box>
          </Message.Header>
          <Box background="secondary" radius="md" padding="xl">
            I’ve updated the empty states and added the missing keyboard
            interactions.
          </Box>
          <Message.Footer alignItems="center" wrap gap="lg">
            <span>10:42 · Edited</span>
            <Button
              variant="link"
              size="sm"
              aria-pressed={liked}
              onClick={() => setLiked(!liked)}
            >
              {liked ? 'Liked · 1' : 'Like'}
            </Button>
          </Message.Footer>
        </Message.Content>
      </Message>
    </Box>
  );
};

/** No footer alignSelf overrides: both metadata and wrapping actions inherit the message side. */
export const FooterFollowsMessageSide = () => {
  const [saved, setSaved] = React.useState({ start: false, end: false });
  const [liked, setLiked] = React.useState({ start: false, end: false });
  return (
    <Box width="100" maxWidth="640px" gap="2xl">
      <Marker variant="separator">
        <Marker.Content>Today</Marker.Content>
      </Marker>
      {(['start', 'end'] as const).map((align) => (
        <Message key={align} align={align}>
          <Message.Content maxWidth="80%">
            <Message.Header fontWeight="semibold">
              {align === 'start' ? 'Riley' : 'You'}
            </Message.Header>
            <Box background="secondary" radius="md" padding="xl">
              {align === 'start'
                ? 'The updated screens are ready for review.'
                : 'I’ll review the screens and share feedback this afternoon.'}
            </Box>
            <Message.Footer wrap alignItems="center" gap="lg">
              <span>
                {align === 'start' ? '10:42 · Read' : '10:43 · Delivered'}
              </span>
              <Button
                variant="link"
                size="sm"
                aria-pressed={liked[align]}
                onClick={() => setLiked({ ...liked, [align]: !liked[align] })}
              >
                {liked[align] ? 'Liked' : 'Like'}
              </Button>
              <Button
                variant="link"
                size="sm"
                aria-pressed={saved[align]}
                onClick={() => setSaved({ ...saved, [align]: !saved[align] })}
              >
                {saved[align] ? 'Saved' : 'Save'}
              </Button>
            </Message.Footer>
          </Message.Content>
        </Message>
      ))}
    </Box>
  );
};

/** Empty avatar slots reserve the same space until the sender's last message. */
export const ConsecutiveMessageGroups = () => (
  <Box width="100" maxWidth="640px" gap="2xl">
    <Marker variant="separator">
      <Marker.Content>Today</Marker.Content>
    </Marker>
    <Message.Group role="group" aria-label="Messages from Riley">
      <Message align="start">
        <Message.Avatar width="32px" aria-hidden="true" />
        <Message.Content maxWidth="80%">
          <Message.Header fontWeight="semibold">Riley</Message.Header>
          <Box background="secondary" radius="md" padding="xl">
            I’ve uploaded the revised screens.
          </Box>
        </Message.Content>
      </Message>
      <Message align="start">
        <Message.Avatar width="32px" aria-hidden="true" />
        <Message.Content maxWidth="80%">
          <Box background="secondary" radius="md" padding="xl">
            The mobile layout is included, too.
          </Box>
        </Message.Content>
      </Message>
      <Message align="start">
        <Message.Avatar>
          <DemoAvatar name="Riley" initials="RL" />
        </Message.Avatar>
        <Message.Content maxWidth="80%">
          <Box background="secondary" radius="md" padding="xl">
            Let me know what you think.
          </Box>
          <Message.Footer>10:42</Message.Footer>
        </Message.Content>
      </Message>
    </Message.Group>
    <Marker variant="separator">
      <Marker.Content>New messages</Marker.Content>
    </Marker>
    <Message.Group role="group" aria-label="Messages from you">
      <Message align="end">
        <Message.Avatar width="32px" aria-hidden="true" />
        <Message.Content maxWidth="80%">
          <Message.Header fontWeight="semibold">You</Message.Header>
          <Box background="secondary" radius="md" padding="xl">
            Thanks for the update.
          </Box>
        </Message.Content>
      </Message>
      <Message align="end">
        <Message.Avatar>
          <DemoAvatar name="You" initials="NY" />
        </Message.Avatar>
        <Message.Content maxWidth="80%">
          <Box background="secondary" radius="md" padding="xl">
            I’ll leave comments before our review.
          </Box>
          <Message.Footer>10:43 · Delivered</Message.Footer>
        </Message.Content>
      </Message>
    </Message.Group>
  </Box>
);
