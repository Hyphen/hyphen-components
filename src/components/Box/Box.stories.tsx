import React from 'react';
import type { Meta } from '@storybook/react';
import { Box } from './Box';

const meta: Meta<typeof Box> = {
  title: 'Components/Box',
  component: Box,
};

export default meta;

export const Overview = () => (
  <Box gap="md">
    <Box
      padding="xl"
      background="tertiary"
      radius="md"
      fontSize={{ base: 'sm', tablet: 'md', hd: 'lg' }}
      borderWidth="sm"
      borderColor="default"
    >
      I am a box with a gray background and border
    </Box>
    <Box gap={{ base: 'sm', tablet: 'md', desktop: 'lg' }} direction="row">
      <Box
        flex="auto"
        radius="md"
        background="info"
        borderColor="info"
        borderWidth="sm"
        height="200px"
      />
      <Box
        flex="auto"
        radius="md"
        background="info"
        borderColor="info"
        borderWidth="sm"
        height="200px"
      />
      <Box
        flex="auto"
        radius="md"
        background="info"
        borderColor="info"
        borderWidth="sm"
        height="200px"
      />
      <Box
        flex="auto"
        radius="md"
        background="info"
        borderColor="info"
        borderWidth="sm"
        height="200px"
      />
      <Box
        flex="auto"
        radius="md"
        background="info"
        borderColor="info"
        borderWidth="sm"
        height="200px"
      />
    </Box>
  </Box>
);

export const Background = () => {
  return (
    <Box gap="md">
      <Box background="primary" padding="md">
        primary
      </Box>
      <Box background="secondary" padding="md">
        secondary
      </Box>
      <Box background="tertiary" padding="md">
        tertiary
      </Box>
      <Box background="info" padding="md">
        info
      </Box>
      <Box background="warning" padding="md">
        warning
      </Box>
      <Box background="danger" padding="md">
        danger
      </Box>
      <Box background="inverse" color="inverse" padding="md">
        inverse
      </Box>
    </Box>
  );
};

export const Border = () => {
  return (
    <Box gap="md">
      <Box borderColor="default" borderWidth="sm" padding="md">
        separator
      </Box>
      <Box borderColor="info" borderWidth="sm" padding="md">
        info
      </Box>
      <Box borderColor="warning" borderWidth="sm" padding="md">
        warning
      </Box>
      <Box borderColor="danger" borderWidth="sm" padding="md">
        danger
      </Box>
      <Box borderColor="inverse" borderWidth="sm" padding="md">
        inverse
      </Box>
    </Box>
  );
};

export const Gap = () => (
  <Box gap="4xl">
    <Box gap="lg" direction="row" wrap maxWidth="500px">
      <Box flex="auto" minWidth="125px" background="tertiary" padding="sm" />
      <Box flex="auto" minWidth="125px" background="tertiary" padding="sm" />
      <Box flex="auto" minWidth="125px" background="tertiary" padding="sm" />
      <Box flex="auto" minWidth="125px" background="tertiary" padding="sm" />
      <Box flex="auto" minWidth="125px" background="tertiary" padding="sm" />
      <Box flex="auto" minWidth="125px" background="tertiary" padding="sm" />
    </Box>
    <Box gap="xs 4xl" direction="row" wrap maxWidth="500px">
      <Box width="100px" background="tertiary" padding="sm" />
      <Box width="100px" background="tertiary" padding="sm" />
      <Box width="100px" background="tertiary" padding="sm" />
      <Box width="100px" background="tertiary" padding="sm" />
      <Box width="100px" background="tertiary" padding="sm" />
      <Box width="100px" background="tertiary" padding="sm" />
    </Box>
    <Box rowGap="xs" columnGap="xl" direction="row" wrap maxWidth="500px">
      <Box width="100px" background="tertiary" padding="sm" />
      <Box width="100px" background="tertiary" padding="sm" />
      <Box width="100px" background="tertiary" padding="sm" />
      <Box width="100px" background="tertiary" padding="sm" />
      <Box width="100px" background="tertiary" padding="sm" />
      <Box width="100px" background="tertiary" padding="sm" />
    </Box>
    <Box rowGap="sm" maxWidth="500px">
      <Box flex="auto" background="tertiary" padding="sm" />
      <Box flex="auto" background="tertiary" padding="sm" />
      <Box flex="auto" background="tertiary" padding="sm" />
    </Box>
  </Box>
);

export const ChildGap = () => (
  <Box childGap="2xl" display="block">
    <Box display="block" background="tertiary" padding="sm" />
    <Box display="block" background="tertiary" padding="sm" />
    <Box display="block" background="tertiary" padding="sm" />
    <Box display="block" background="tertiary" padding="sm" />
    <Box display="block" background="tertiary" padding="sm" />
  </Box>
);

export const FlexAuto = () => (
  <Box gap="md">
    <Box gap="md" direction="row">
      <Box
        flex="auto"
        background="tertiary"
        padding="sm"
        justifyContent="center"
        alignItems="center"
      >
        auto
      </Box>
      <Box
        flex="auto"
        background="tertiary"
        padding="sm"
        justifyContent="center"
        alignItems="center"
      >
        auto
      </Box>
      <Box
        flex="auto"
        background="tertiary"
        padding="sm"
        justifyContent="center"
        alignItems="center"
      >
        auto
      </Box>
      <Box
        flex="auto"
        background="tertiary"
        padding="sm"
        justifyContent="center"
        alignItems="center"
      >
        auto
      </Box>
      <Box
        flex="auto"
        background="tertiary"
        padding="sm"
        justifyContent="center"
        alignItems="center"
      >
        auto
      </Box>
    </Box>
  </Box>
);

export const FlexDirection = () => (
  <Box gap="xl">
    <Box fontWeight="bold">Row</Box>
    <Box gap="md" direction="row">
      <Box flex="auto" background="tertiary" padding="sm">
        1
      </Box>
      <Box flex="auto" background="tertiary" padding="sm">
        2
      </Box>
      <Box flex="auto" background="tertiary" padding="sm">
        3
      </Box>
      <Box flex="auto" background="tertiary" padding="sm">
        4
      </Box>
      <Box flex="auto" background="tertiary" padding="sm">
        5
      </Box>
    </Box>
    <Box fontWeight="bold">Column</Box>
    <Box gap="md" direction="column">
      <Box width="20%" background="tertiary" padding="sm">
        1
      </Box>
      <Box width="20%" background="tertiary" padding="sm">
        2
      </Box>
      <Box width="20%" background="tertiary" padding="sm">
        3
      </Box>
      <Box width="20%" background="tertiary" padding="sm">
        4
      </Box>
      <Box width="20%" background="tertiary" padding="sm">
        5
      </Box>
    </Box>
    <Box fontWeight="bold">Row Reverse</Box>
    <Box gap="md" direction="row-reverse">
      <Box width="20%" background="danger" padding="sm">
        1
      </Box>
      <Box width="20%" background="danger" padding="sm">
        2
      </Box>
      <Box width="20%" background="danger" padding="sm">
        3
      </Box>
      <Box width="20%" background="danger" padding="sm">
        4
      </Box>
      <Box width="20%" background="danger" padding="sm">
        5
      </Box>
    </Box>
    <Box fontWeight="bold">Column Reverse</Box>
    <Box gap="md" direction="column-reverse">
      <Box width="20%" background="danger" padding="sm">
        1
      </Box>
      <Box width="20%" background="danger" padding="sm">
        2
      </Box>
      <Box width="20%" background="danger" padding="sm">
        3
      </Box>
      <Box width="20%" background="danger" padding="sm">
        4
      </Box>
      <Box width="20%" background="danger" padding="sm">
        5
      </Box>
    </Box>
  </Box>
);

export const FlexShrinkGrow = () => (
  <Box gap="md">
    <Box gap="md" direction="row">
      <Box
        style={{ flex: '3' }}
        background="tertiary"
        padding="sm"
        justifyContent="center"
        alignItems="center"
      >
        3
      </Box>
      <Box
        style={{ flex: '1' }}
        background="tertiary"
        padding="sm"
        justifyContent="center"
        alignItems="center"
      >
        1
      </Box>
      <Box
        style={{ flex: '1' }}
        background="tertiary"
        padding="sm"
        justifyContent="center"
        alignItems="center"
      >
        1
      </Box>
      <Box
        style={{ flex: '2' }}
        background="tertiary"
        padding="sm"
        justifyContent="center"
        alignItems="center"
      >
        2
      </Box>
      <Box
        style={{ flex: '1' }}
        background="tertiary"
        padding="sm"
        justifyContent="center"
        alignItems="center"
      >
        1
      </Box>
    </Box>
  </Box>
);

export const FlexJustify = () => (
  <Box flex="auto" gap="md">
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">start</Box>
      <Box
        flex="auto"
        background="secondary"
        justifyContent="flex-start"
        direction="row"
        gap="md"
      >
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">center</Box>
      <Box
        flex="auto"
        background="secondary"
        justifyContent="center"
        direction="row"
        gap="md"
      >
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">end</Box>
      <Box
        flex="auto"
        background="secondary"
        justifyContent="flex-end"
        direction="row"
        gap="md"
      >
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">between</Box>
      <Box
        flex="auto"
        background="secondary"
        justifyContent="space-between"
        direction="row"
        gap="md"
      >
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">around</Box>
      <Box
        flex="auto"
        background="secondary"
        justifyContent="space-around"
        direction="row"
        gap="md"
      >
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">evenly</Box>
      <Box
        flex="auto"
        background="secondary"
        justifyContent="space-evenly"
        direction="row"
        gap="md"
      >
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
      </Box>
    </Box>
  </Box>
);

export const FlexAlign = () => (
  <Box flex="auto" gap="md">
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">start</Box>
      <Box
        flex="auto"
        height="100px"
        background="secondary"
        alignItems="flex-start"
        direction="row"
        gap="md"
      >
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">center</Box>
      <Box
        flex="auto"
        height="100px"
        background="secondary"
        alignItems="center"
        direction="row"
        gap="md"
      >
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">end</Box>
      <Box
        flex="auto"
        height="100px"
        background="secondary"
        alignItems="flex-end"
        direction="row"
        gap="md"
      >
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">baseline</Box>
      <Box
        flex="auto"
        height="100px"
        background="secondary"
        alignItems="baseline"
        direction="row"
        gap="md"
      >
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
        <Box padding="sm" background="inverse" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">stretch</Box>
      <Box
        flex="auto"
        height="100px"
        background="secondary"
        alignItems="stretch"
        direction="row"
        gap="md"
      >
        <Box padding="md" background="inverse" />
        <Box padding="md" background="inverse" />
        <Box padding="md" background="inverse" />
      </Box>
    </Box>
  </Box>
);

export const FlexAlignContent = () => (
  <Box gap="md">
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">start</Box>
      <Box
        flex="auto"
        alignContent="flex-start"
        height="200px"
        wrap
        gap="md"
        background="secondary"
        direction="row"
      >
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">center</Box>
      <Box
        flex="auto"
        alignContent="center"
        height="200px"
        wrap
        gap="md"
        background="secondary"
        direction="row"
      >
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">end</Box>
      <Box
        flex="auto"
        alignContent="flex-end"
        height="200px"
        wrap
        gap="md"
        background="secondary"
        direction="row"
      >
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">stretch</Box>
      <Box
        flex="auto"
        alignContent="stretch"
        height="200px"
        wrap
        gap="md"
        background="secondary"
        direction="row"
      >
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">between</Box>
      <Box
        flex="auto"
        alignContent="space-between"
        height="200px"
        wrap
        gap="md"
        background="secondary"
        direction="row"
      >
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
        <Box width="200px" padding="sm" background="inverse" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">around</Box>
      <Box
        flex="auto"
        alignContent="center"
        height="200px"
        wrap
        gap="md"
        background="secondary"
        direction="row"
        position="relative"
      >
        <Box width="25%" padding="sm" background="inverse" />
        <Box width="25%" padding="sm" background="inverse" />
        <Box width="25%" padding="sm" background="inverse" />
        <Box width="25%" padding="sm" background="inverse" />
      </Box>
    </Box>
  </Box>
);

export const FontColor = () => (
  <>
    <Box color="base">base</Box>
    <Box color="secondary">secondary</Box>
    <Box color="inverse">inverse</Box>
    <Box color="disabled">disabled</Box>
    <Box color="success">success</Box>
    <Box color="warn">warn</Box>
    <Box color="danger">danger</Box>
  </>
);

export const FontSizes = () => (
  <>
    <Box fontSize="2xs">The quick brown fox jumps over the lazy dog</Box>
    <Box fontSize="xs">The quick brown fox jumps over the lazy dog</Box>
    <Box fontSize="sm">The quick brown fox jumps over the lazy dog</Box>
    <Box fontSize="md">The quick brown fox jumps over the lazy dog</Box>
    <Box fontSize="lg">The quick brown fox jumps over the lazy dog</Box>
    <Box fontSize="xl">The quick brown fox jumps over the lazy dog</Box>
    <Box fontSize="2xl">The quick brown fox jumps over the lazy dog</Box>
    <Box fontSize="3xl">The quick brown fox jumps over the lazy dog</Box>
    <Box fontSize="4xl">The quick brown fox jumps over the lazy dog</Box>
    <Box fontSize="5xl">The quick brown fox jumps over the lazy dog</Box>
    <Box fontSize="6xl">The quick brown fox jumps over the lazy dog</Box>
    <Box fontSize="7xl">The quick brown fox jumps over the lazy dog</Box>
  </>
);

export const FontWeights = () => (
  <>
    <Box fontWeight="light">light</Box>
    <Box fontWeight="normal">normal</Box>
    <Box fontWeight="medium">medium</Box>
    <Box fontWeight="semibold">semibold</Box>
    <Box fontWeight="bold">bold</Box>
  </>
);

export const FontFamily = () => (
  <>
    <Box fontFamily="body" margin="0 0 md 0" fontSize="xl">
      Body
    </Box>
    <Box fontFamily="brand" margin="0 0 md 0" fontSize="xl">
      Brand
    </Box>
    <Box fontFamily="monospace" margin="0 0 md 0" fontSize="xl">
      Monospace
    </Box>
  </>
);

export const TextAlign = () => (
  <Box display="block" childGap="xl">
    <Box
      display="block"
      textAlign="left"
      color="base"
      background="secondary"
      padding="sm"
    >
      left
    </Box>
    <Box
      display="block"
      textAlign="center"
      color="base"
      background="secondary"
      padding="sm"
    >
      center
    </Box>
    <Box
      display="block"
      textAlign="right"
      color="base"
      background="secondary"
      padding="sm"
    >
      right
    </Box>
  </Box>
);

export const Margin = () => (
  <>
    <Box margin="lg" background="secondary">
      lg margin
    </Box>
    <Box margin="lg md" background="secondary">
      lg vertical and md horizontal
    </Box>
    <Box margin="0 2xl" background="secondary">
      0 vertical and 2xl horizontal
    </Box>
    <Box margin="sm md 2xl" background="secondary">
      sm top, md horizontal, 2xl bottom
    </Box>
    <Box margin="sm lg 2xl 0" background="secondary">
      sm top, lg right, 2xl bottom, 0 left
    </Box>
  </>
);

export const Padding = () => (
  <>
    <Box padding="lg" margin="sm 0" background="secondary">
      lg padding
    </Box>
    <Box padding="lg md" margin="sm 0" background="secondary">
      lg vertical and md horizontal
    </Box>
    <Box padding="0 2xl" margin="sm 0" background="secondary">
      0 vertical and 2xl horizontal
    </Box>
    <Box padding="sm md 2xl" margin="sm 0" background="secondary">
      sm top, md horizontal, 2xl bottom
    </Box>
    <Box padding="sm lg 2xl 0" margin="sm 0" background="secondary">
      sm top, lg right, 2xl bottom, 0 left
    </Box>
  </>
);

export const Radius = () => (
  <>
    <Box direction="row" gap="2xs" justifyContent="space-between">
      <Box radius="xs" background="tertiary" padding="sm">
        xs
      </Box>
      <Box radius="sm" background="tertiary" padding="sm">
        sm
      </Box>
      <Box radius="md" background="tertiary" padding="sm">
        md
      </Box>
      <Box radius="lg" background="tertiary" padding="sm">
        lg
      </Box>
      <Box radius="sm lg" background="tertiary" padding="sm">
        sm lg
      </Box>
      <Box radius="sm md lg" background="tertiary" padding="sm">
        sm md lg
      </Box>
      <Box radius="xs sm md lg" background="tertiary" padding="sm">
        xs sm md lg
      </Box>
      <Box radius="0 0 md md" background="tertiary" padding="sm">
        0 0 md md
      </Box>
      <Box radius="md md 0 0" background="tertiary" padding="sm">
        md md 0 0
      </Box>
    </Box>
  </>
);

export const Shadow = () => (
  <Box
    direction="row"
    background="secondary"
    padding="2xl"
    justifyContent="space-between"
  >
    <Box
      shadow="0"
      alignItems="center"
      justifyContent="center"
      background="primary"
      radius="md"
      padding="sm"
      height="lg"
    >
      0
    </Box>
    <Box
      shadow="2xs"
      alignItems="center"
      justifyContent="center"
      background="primary"
      radius="md"
      padding="sm"
      height="lg"
    >
      2xs
    </Box>
    <Box
      shadow="xs"
      alignItems="center"
      justifyContent="center"
      background="primary"
      radius="md"
      padding="sm"
      height="lg"
    >
      xs
    </Box>
    <Box
      shadow="sm"
      alignItems="center"
      justifyContent="center"
      background="primary"
      radius="md"
      padding="sm"
      height="lg"
    >
      sm
    </Box>
    <Box
      shadow="md"
      alignItems="center"
      justifyContent="center"
      background="primary"
      radius="md"
      padding="sm"
      height="lg"
    >
      md
    </Box>
    <Box
      shadow="lg"
      alignItems="center"
      justifyContent="center"
      background="primary"
      radius="md"
      padding="sm"
      height="lg"
    >
      lg
    </Box>
    <Box
      shadow="xl"
      alignItems="center"
      justifyContent="center"
      background="primary"
      radius="md"
      padding="sm"
      height="lg"
    >
      xl
    </Box>
    <Box
      shadow="2xl"
      alignItems="center"
      justifyContent="center"
      background="primary"
      radius="md"
      padding="sm"
      height="lg"
    >
      2xl
    </Box>
  </Box>
);

export const Width = () => (
  <Box background="secondary" gap="xs">
    <Box background="tertiary" width="227px">
      227px
    </Box>
    <Box background="tertiary" width="10rem">
      10rem
    </Box>
    <Box background="tertiary" width="50%">
      50%
    </Box>
  </Box>
);

export const WidthTokens = () => (
  <Box background="secondary" gap="xs" overflow="auto">
    <Box background="tertiary" width="2xs">
      2xs
    </Box>
    <Box background="tertiary" width="xs">
      xs
    </Box>
    <Box background="tertiary" width="sm">
      sm
    </Box>
    <Box background="tertiary" width="md">
      md
    </Box>
    <Box background="tertiary" width="lg">
      lg
    </Box>
    <Box background="tertiary" width="xl">
      xl
    </Box>
    <Box background="tertiary" width="2xl">
      2xl
    </Box>
    <Box background="tertiary" width="3xl">
      3xl
    </Box>
    <Box background="tertiary" width="4xl">
      4xl
    </Box>
    <Box background="tertiary" width="5xl">
      5xl
    </Box>
    <Box background="tertiary" width="6xl">
      6xl
    </Box>
    <Box background="tertiary" width="7xl">
      7xl
    </Box>
    <Box background="tertiary" width="8xl">
      8xl
    </Box>
    <Box background="tertiary" width="9xl">
      9xl
    </Box>
    <Box background="tertiary" width="10xl">
      10xl
    </Box>
  </Box>
);

export const WidthPercentages = () => (
  <Box background="secondary" gap="xs" position="relative">
    <Box background="tertiary" width="10">
      10%
    </Box>
    <Box background="tertiary" width="15">
      15%
    </Box>
    <Box background="tertiary" width="20">
      20%
    </Box>
    <Box background="tertiary" width="25">
      25%
    </Box>
    <Box background="tertiary" width="30">
      30%
    </Box>
    <Box background="tertiary" width="33">
      33%
    </Box>
    <Box background="tertiary" width="34">
      34%
    </Box>
    <Box background="tertiary" width="40">
      40%
    </Box>
    <Box background="tertiary" width="50">
      50%
    </Box>
    <Box background="tertiary" width="60">
      60%
    </Box>
    <Box background="tertiary" width="70">
      70%
    </Box>
    <Box background="tertiary" width="75">
      75%
    </Box>
    <Box background="tertiary" width="80">
      80%
    </Box>
    <Box background="tertiary" width="90">
      90%
    </Box>
    <Box background="tertiary" width="100">
      100%
    </Box>
  </Box>
);

export const WidthMax = () => (
  <Box background="secondary" gap="xs">
    <Box background="tertiary" maxWidth="145px">
      145px
    </Box>
    <Box background="tertiary" maxWidth="50%">
      50%
    </Box>
  </Box>
);

export const WidthMin = () => (
  <Box alignItems="flex-start" background="secondary" gap="xs">
    <Box background="tertiary" minWidth="145px">
      145px
    </Box>
    <Box background="tertiary" minWidth="50%">
      50%
    </Box>
  </Box>
);

export const Height = () => (
  <Box background="secondary" gap="xs">
    <Box
      background="tertiary"
      height="227px"
      justifyContent="center"
      alignItems="center"
    >
      227px
    </Box>
    <Box
      background="tertiary"
      height="10rem"
      justifyContent="center"
      alignItems="center"
    >
      10rem
    </Box>
    <Box
      background="tertiary"
      height="4em"
      justifyContent="center"
      alignItems="center"
    >
      4em
    </Box>
  </Box>
);

export const HeightTokens = () => (
  <Box background="secondary" gap="xs" direction="row">
    <Box
      flex="auto"
      background="tertiary"
      justifyContent="center"
      alignItems="center"
      height="sm"
    >
      sm
    </Box>
    <Box
      flex="auto"
      background="tertiary"
      justifyContent="center"
      alignItems="center"
      height="md"
    >
      md
    </Box>
    <Box
      flex="auto"
      background="tertiary"
      justifyContent="center"
      alignItems="center"
      height="lg"
    >
      lg
    </Box>
    <Box
      flex="auto"
      background="tertiary"
      justifyContent="center"
      alignItems="center"
      height="xl"
    >
      xl
    </Box>
    <Box
      flex="auto"
      background="tertiary"
      justifyContent="center"
      alignItems="center"
      height="2xl"
    >
      2xl
    </Box>
    <Box
      flex="auto"
      background="tertiary"
      justifyContent="center"
      alignItems="center"
      height="3xl"
    >
      3xl
    </Box>
    <Box
      flex="auto"
      background="tertiary"
      justifyContent="center"
      alignItems="center"
      height="4xl"
    >
      4xl
    </Box>
    <Box
      flex="auto"
      background="tertiary"
      justifyContent="center"
      alignItems="center"
      height="5xl"
    >
      5xl
    </Box>
    <Box
      flex="auto"
      background="tertiary"
      justifyContent="center"
      alignItems="center"
      height="6xl"
    >
      6xl
    </Box>
    <Box
      flex="auto"
      background="tertiary"
      justifyContent="center"
      alignItems="center"
      height="7xl"
    >
      7xl
    </Box>
    <Box
      flex="auto"
      background="tertiary"
      justifyContent="center"
      alignItems="center"
      height="8xl"
    >
      8xl
    </Box>
    <Box
      flex="auto"
      background="tertiary"
      justifyContent="center"
      alignItems="center"
      height="9xl"
    >
      9xl
    </Box>
    <Box
      flex="auto"
      background="tertiary"
      justifyContent="center"
      alignItems="center"
      height="10xl"
    >
      10xl
    </Box>
  </Box>
);

export const HeightPercentages = () => (
  <Box height="400px" gap="xs" direction="row" background="secondary">
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
      height="10"
    >
      10%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
      height="15"
    >
      15%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
      height="20"
    >
      20%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
      height="25"
    >
      25%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
      height="30"
    >
      30%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
      height="33"
    >
      33%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
      height="34"
    >
      34%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
      height="40"
    >
      40%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
      height="50"
    >
      50%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
      height="60"
    >
      60%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
      height="70"
    >
      70%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
      height="75"
    >
      75%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
      height="80"
    >
      80%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
      height="90"
    >
      90%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
      height="100"
    >
      100%
    </Box>
  </Box>
);

export const HeightMax = () => (
  <Box height="300px" background="secondary" direction="row" gap="xs">
    <Box
      maxHeight="50px"
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
    >
      50px
    </Box>
    <Box
      maxHeight="50%"
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
    >
      50%
    </Box>
  </Box>
);

export const HeightMin = () => (
  <Box
    height="300px"
    background="secondary"
    alignItems="flex-start"
    direction="row"
    gap="xs"
  >
    <Box
      flex="auto"
      minHeight="50px"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
    >
      50px
    </Box>
    <Box
      flex="auto"
      minHeight="50%"
      justifyContent="center"
      alignItems="center"
      background="tertiary"
    >
      50%
    </Box>
  </Box>
);

export const Overflow = () => (
  <Box
    overflow="auto"
    padding="md"
    gap="md"
    flex="auto"
    background="secondary"
    borderColor="default"
    height="100px"
  >
    <p>
      Lorem ipsum dolor sit amet Et iusto dolor dolores lorem magna voluptua
      clita ullamcorper dolor voluptua et praesent ut. Clita sanctus ut duo
      dolore accumsan volutpat ipsum duis gubergren amet sadipscing et ipsum
      dolore ut vel. Cum ut justo lorem dolor exerci nulla voluptua. Sed lorem
      augue sed aliquam. Eu magna nulla sed ut. Tempor amet duo dolore et et
      elit tation illum sadipscing nisl erat duo rebum labore et facilisis
      dolore. Gubergren facilisi voluptua in et. Et stet sed commodo dolores
      vero at adipiscing doming ipsum amet sit eos facer rebum sit labore ea ut.
      Aliquam sadipscing suscipit augue eleifend.
    </p>
    <p>
      lorem augue sed aliquam. Eu magna nulla sed ut. Tempor amet duo dolore et
      et elit tation illum sadipscing nisl erat duo rebum labore et facilisis
      dolore. Gubergren facilisi voluptua in et. Et stet sed commodo dolores
      vero at adipiscing doming ipsum amet sit eos facer rebum sit labore ea ut.
      Aliquam sadipscing suscipit augue eleifend.
    </p>
    <p>
      et et elit tation illum sadipscing nisl erat duo rebum labore et facilisis
      dolore. Gubergren facilisi voluptua in et. Et stet sed commodo dolores
      vero at adipiscing doming ipsum amet sit eos facer rebum sit labore ea ut.
      Aliquam sadipscing suscipit augue eleifend.
    </p>
  </Box>
);

export const Cursor = () => (
  <Box padding="md" gap="md" flex="auto" background="secondary" overflow="auto">
    <Box cursor="pointer" padding="md" background="tertiary">
      pointer
    </Box>
    <Box cursor="move" padding="md" background="tertiary">
      move
    </Box>
    <Box cursor="not-allowed" padding="md" background="tertiary">
      not-allowed
    </Box>
    <Box cursor="grab" padding="md" background="tertiary">
      grab
    </Box>
    <Box cursor="zoom-in" padding="md" background="tertiary">
      zoom-in
    </Box>
    <Box cursor="zoom-out" padding="md" background="tertiary">
      zoom-out
    </Box>
  </Box>
);

export const Position = () => (
  <Box
    padding="md"
    childGap="md"
    display="block"
    background="secondary"
    overflow="scroll"
    height="300px"
  >
    <Box
      position="absolute"
      padding="md"
      background="tertiary"
      style={{ zIndex: 1 }}
      width="100px"
      height="150px"
    >
      absolute
    </Box>
    <Box
      position="relative"
      padding="md"
      background="tertiary"
      textAlign="right"
      height="200px"
    >
      relative
    </Box>
    <Box
      position="sticky"
      padding="md"
      background="tertiary"
      height="50px"
      color="white"
      style={{ top: 0, zIndex: 2 }}
    >
      sticky
    </Box>
    <Box position="static" padding="md" background="tertiary" height="400px">
      static
    </Box>
  </Box>
);

export const Hover = () => (
  <Box gap="md">
    <Box
      padding="md"
      background="tertiary"
      color="white"
      shadow="xs"
      hover={{
        background: 'success',
      }}
      cursor="pointer"
    >
      simple background color effect
    </Box>
    <Box
      padding="md"
      background="primary"
      color="base"
      radius="md"
      borderWidth="sm"
      borderColor="default"
      fontWeight="bold"
      direction="row"
      justifyContent="center"
      hover={{
        background: 'success',
        color: 'white',
      }}
      cursor="pointer"
    >
      an outlined button
    </Box>
    <Box
      padding="md"
      radius="md"
      background="primary"
      shadow="sm"
      borderWidth="sm"
      borderColor="default"
      hover={{
        shadow: 'lg',
      }}
      cursor="grab"
    >
      Card shadow effect
    </Box>
    <Box
      padding="md"
      background="primary"
      hover={{
        fontSize: 'xl',
      }}
    >
      growing text
    </Box>
    <Box
      padding="md"
      background="primary"
      borderWidth="sm"
      borderColor="default"
      hover={{
        borderWidth: 'sm',
        borderColor: 'hover',
      }}
    >
      adding a border
    </Box>
    <Box
      padding="md"
      background="primary"
      borderColor="default"
      borderWidth="sm"
      hover={{
        borderWidth: 'md',
      }}
    >
      changing a border width
    </Box>
  </Box>
);

export const Focus = () => (
  <Box gap="md">
    <Box
      as="input"
      type="text"
      padding="md"
      background="primary"
      color="base"
      shadow="xs"
      borderWidth="sm"
      borderColor="default"
      radius="md"
      style={{ outline: 'none' }}
      focus={{
        borderColor: 'hover',
      }}
      placeholder="useful for form inputs..."
    />
    <Box
      radius="md"
      shadow="xs"
      padding="md"
      focus={{
        shadow: 'lg',
      }}
      tabIndex="0"
      style={{ outline: 'none' }}
    >
      Card focus effect
    </Box>
  </Box>
);

export const Responsive = () => (
  <Box
    background="secondary"
    borderColor="default"
    padding={{ base: 'sm', tablet: 'md', desktop: 'lg', hd: 'xl' }}
    fontSize={{ base: 'md', tablet: 'lg', desktop: 'xl', hd: '3xl' }}
    borderWidth={{ base: 'sm', tablet: 'xs', desktop: 'md', hd: '0' }}
    textAlign={{ base: 'center', tablet: 'right', desktop: 'left' }}
    width={{ base: '5xl', tablet: '50', desktop: '25', hd: '10xl' }}
  >
    <p>Resize the viewport to see how my appearance changes.</p>
  </Box>
);

export const Omit = () => (
  <Box padding={{ desktop: 'lg' }} background="secondary">
    <p>
      This box will have no padding until the viewport reaches the desktop
      breakpoint.{' '}
    </p>
  </Box>
);
