import type { Meta } from '@storybook/react';

import { Box } from './Box';
import React from 'react';
import { FONT_FAMILY_VALUES, FONT_SIZE_OPTIONS } from '../../lib/tokens';

const meta: Meta<typeof Box> = {
  title: 'Components/Box',
  component: Box,
};

export default meta;

export const Overview = () => (
  <Box gap="md">
    <Box
      padding="xl"
      background="primary-100"
      radius="md"
      fontSize={{ base: 'sm', tablet: 'md', hd: 'lg' }}
      borderWidth="sm"
      borderColor="primary-200"
    >
      I am a box with a gray background and border
    </Box>
    <Box gap={{ base: 'sm', tablet: 'md', desktop: 'lg' }} direction="row">
      <Box flex="auto" radius="md" background="secondary-100" height="lg" />
      <Box flex="auto" radius="md" background="secondary-100" height="lg" />
      <Box flex="auto" radius="md" background="secondary-100" height="lg" />
      <Box flex="auto" radius="md" background="secondary-100" height="lg" />
      <Box flex="auto" radius="md" background="secondary-100" height="lg" />
    </Box>
  </Box>
);

export const Background = () => (
  <>
    <Box background="secondary-lighter" margin="xs" padding="xs">
      secondary-lighter
    </Box>
    <Box background="danger-lightest" margin="xs" padding="xs">
      danger-lightest
    </Box>
    <Box background="primary" margin="xs" padding="xs">
      primary
    </Box>
  </>
);

export const Border = () => (
  <Box gap="sm" direction="row">
    <Box borderColor="grey-200" borderWidth="xs md" padding="xs">
      grey-lighter, xs md
    </Box>
    <Box borderColor="danger" borderWidth="0 sm md xs" padding="xs">
      danger, 0 sm md xs
    </Box>
    <Box borderColor="primary-100" borderWidth="md" padding="xs">
      primary-darker, md
    </Box>
  </Box>
);

export const Gap = () => (
  <Box gap="lg" direction="row" wrap maxWidth="4xl">
    <Box width="xl" background="primary-light" height="md" />
    <Box width="xl" background="primary-light" height="md" />
    <Box width="xl" background="primary-light" height="md" />
    <Box width="xl" background="primary-light" height="md" />
    <Box width="xl" background="primary-light" height="md" />
    <Box width="xl" background="primary-light" height="md" />
  </Box>
);

export const GapShorthand = () => (
  <Box gap="xs 4xl" direction="row" wrap maxWidth="4xl">
    <Box width="xl" background="primary-light" height="md" />
    <Box width="xl" background="primary-light" height="md" />
    <Box width="xl" background="primary-light" height="md" />
    <Box width="xl" background="primary-light" height="md" />
    <Box width="xl" background="primary-light" height="md" />
    <Box width="xl" background="primary-light" height="md" />
  </Box>
);

export const GapRowAndColumn = () => (
  <Box gap="lg">
    <Box rowGap="xs" columnGap="xl" direction="row" wrap maxWidth="4xl">
      <Box width="xl" background="primary-light" height="md" />
      <Box width="xl" background="primary-light" height="md" />
      <Box width="xl" background="primary-light" height="md" />
      <Box width="xl" background="primary-light" height="md" />
      <Box width="xl" background="primary-light" height="md" />
      <Box width="xl" background="primary-light" height="md" />
    </Box>
    <Box rowGap="sm" maxWidth="4xl">
      <Box width="100" background="primary-light" height="md" />
      <Box width="100" background="primary-light" height="md" />
      <Box width="100" background="primary-light" height="md" />
    </Box>
    <Box columnGap="sm" maxWidth="4xl" direction="row">
      <Box flex="auto" background="primary-light" height="md" />
      <Box flex="auto" background="primary-light" height="md" />
      <Box flex="auto" background="primary-light" height="md" />
    </Box>
  </Box>
);

export const ChildGap = () => (
  <Box childGap="md" display="block">
    <Box display="block" background="primary-light" padding="sm" />
    <Box display="block" background="primary-light" padding="sm" />
    <Box display="block" background="primary-light" padding="sm" />
    <Box display="block" background="primary-light" padding="sm" />
    <Box display="block" background="primary-light" padding="sm" />
  </Box>
);

export const FlexAuto = () => (
  <Box gap="md">
    <Box gap="md" direction="row">
      <Box
        flex="auto"
        background="primary-light"
        height="lg"
        justifyContent="center"
        alignItems="center"
      >
        auto
      </Box>
      <Box
        flex="auto"
        background="primary-light"
        height="lg"
        justifyContent="center"
        alignItems="center"
      >
        auto
      </Box>
      <Box
        flex="auto"
        background="primary-light"
        height="lg"
        justifyContent="center"
        alignItems="center"
      >
        auto
      </Box>
      <Box
        flex="auto"
        background="primary-light"
        height="lg"
        justifyContent="center"
        alignItems="center"
      >
        auto
      </Box>
      <Box
        flex="auto"
        background="primary-light"
        height="lg"
        justifyContent="center"
        alignItems="center"
      >
        auto
      </Box>
    </Box>
  </Box>
);

export const FlexDirection = () => (
  <>
    <Box margin="0 0 md 0" fontWeight="bold">
      Row
    </Box>
    <Box gap="md" padding="sm" direction="row">
      <Box flex="auto" background="primary-light" padding="sm">
        1
      </Box>
      <Box flex="auto" background="primary-light" padding="sm">
        2
      </Box>
      <Box flex="auto" background="primary-light" padding="sm">
        3
      </Box>
      <Box flex="auto" background="primary-light" padding="sm">
        4
      </Box>
      <Box flex="auto" background="primary-light" padding="sm">
        5
      </Box>
    </Box>
    <Box margin="lg 0 md 0" fontWeight="bold">
      Column
    </Box>
    <Box gap="md" padding="sm" direction="column">
      <Box width="20%" background="primary-light" padding="sm">
        1
      </Box>
      <Box width="20%" background="primary-light" padding="sm">
        2
      </Box>
      <Box width="20%" background="primary-light" padding="sm">
        3
      </Box>
      <Box width="20%" background="primary-light" padding="sm">
        4
      </Box>
      <Box width="20%" background="primary-light" padding="sm">
        5
      </Box>
    </Box>
    <Box margin="lg 0 md 0" fontWeight="bold">
      Row Reverse
    </Box>
    <Box gap="md" padding="sm" direction="row-reverse">
      <Box width="20%" background="danger-light" padding="sm">
        1
      </Box>
      <Box width="20%" background="danger-light" padding="sm">
        2
      </Box>
      <Box width="20%" background="danger-light" padding="sm">
        3
      </Box>
      <Box width="20%" background="danger-light" padding="sm">
        4
      </Box>
      <Box width="20%" background="danger-light" padding="sm">
        5
      </Box>
    </Box>
    <Box margin="lg 0 md 0" fontWeight="bold">
      Column Reverse
    </Box>
    <Box gap="md" padding="sm" direction="column-reverse">
      <Box width="20%" background="danger-light" padding="sm">
        1
      </Box>
      <Box width="20%" background="danger-light" padding="sm">
        2
      </Box>
      <Box width="20%" background="danger-light" padding="sm">
        3
      </Box>
      <Box width="20%" background="danger-light" padding="sm">
        4
      </Box>
      <Box width="20%" background="danger-light" padding="sm">
        5
      </Box>
    </Box>
    <Box margin="lg 0 md 0" fontWeight="bold">
      Row Reverse
    </Box>
    <Box padding="sm" direction="row-reverse">
      <Box width="20%" background="primary-light" padding="sm">
        1
      </Box>
      <Box
        width="20%"
        background="primary-light"
        padding="sm"
        margin="0 md 0 0"
      >
        2
      </Box>
      <Box
        width="20%"
        background="primary-light"
        padding="sm"
        margin="0 md 0 0"
      >
        3
      </Box>
      <Box
        width="20%"
        background="primary-light"
        padding="sm"
        margin="0 md 0 0"
      >
        4
      </Box>
      <Box
        width="20%"
        background="primary-light"
        padding="sm"
        margin="0 md 0 0"
      >
        5
      </Box>
    </Box>
    <Box margin="lg 0 md 0" fontWeight="bold">
      Column Reverse
    </Box>
    <Box padding="sm" direction="column-reverse">
      <Box width="20%" background="primary-light" padding="sm">
        1
      </Box>
      <Box
        width="20%"
        background="primary-light"
        padding="sm"
        margin="0 0 md 0"
      >
        2
      </Box>
      <Box
        width="20%"
        background="primary-light"
        padding="sm"
        margin="0 0 md 0"
      >
        3
      </Box>
      <Box
        width="20%"
        background="primary-light"
        padding="sm"
        margin="0 0 md 0"
      >
        4
      </Box>
      <Box
        width="20%"
        background="primary-light"
        padding="sm"
        margin="0 0 md 0"
      >
        5
      </Box>
    </Box>
  </>
);

export const FlexShrinkGrow = () => (
  <Box gap="md">
    <Box gap="md" direction="row">
      <Box
        style={{ flex: '3' }}
        background="primary-light"
        height="lg"
        justifyContent="center"
        alignItems="center"
      >
        3
      </Box>
      <Box
        style={{ flex: '1' }}
        background="primary-light"
        height="lg"
        justifyContent="center"
        alignItems="center"
      >
        1
      </Box>
      <Box
        style={{ flex: '1' }}
        background="primary-light"
        height="lg"
        justifyContent="center"
        alignItems="center"
      >
        1
      </Box>
      <Box
        style={{ flex: '2' }}
        background="primary-light"
        height="lg"
        justifyContent="center"
        alignItems="center"
      >
        2
      </Box>
      <Box
        style={{ flex: '1' }}
        background="primary-light"
        height="lg"
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
        background="primary-lighter"
        justifyContent="flex-start"
        direction="row"
        gap="md"
      >
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">center</Box>
      <Box
        flex="auto"
        background="primary-lighter"
        justifyContent="center"
        direction="row"
        gap="md"
      >
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">end</Box>
      <Box
        flex="auto"
        background="primary-lighter"
        justifyContent="flex-end"
        direction="row"
        gap="md"
      >
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">between</Box>
      <Box
        flex="auto"
        background="primary-lighter"
        justifyContent="space-between"
        direction="row"
        gap="md"
      >
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">around</Box>
      <Box
        flex="auto"
        background="primary-lighter"
        justifyContent="space-around"
        direction="row"
        gap="md"
      >
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">evenly</Box>
      <Box
        flex="auto"
        background="primary-lighter"
        justifyContent="space-evenly"
        direction="row"
        gap="md"
      >
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
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
        background="primary-lighter"
        alignItems="flex-start"
        direction="row"
        gap="md"
      >
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">center</Box>
      <Box
        flex="auto"
        height="100px"
        background="primary-lighter"
        alignItems="center"
        direction="row"
        gap="md"
      >
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">end</Box>
      <Box
        flex="auto"
        height="100px"
        background="primary-lighter"
        alignItems="flex-end"
        direction="row"
        gap="md"
      >
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">baseline</Box>
      <Box
        flex="auto"
        height="100px"
        background="primary-lighter"
        alignItems="baseline"
        direction="row"
        gap="md"
      >
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
        <Box width="md" height="md" background="primary" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box width="70px">stretch</Box>
      <Box
        flex="auto"
        height="100px"
        background="primary-lighter"
        alignItems="stretch"
        direction="row"
        gap="md"
      >
        <Box width="md" background="primary" />
        <Box width="md" background="primary" />
        <Box width="md" background="primary" />
      </Box>
    </Box>
  </Box>
);

export const FlexAlignContent = () => (
  <Box gap="md">
    <Box direction="row" alignItems="center" gap="md">
      <Box flex="auto" width="70px">
        start
      </Box>
      <Box
        flex="auto"
        alignContent="flex-start"
        height="200px"
        wrap
        gap="md"
        background="primary-lighter"
        direction="row"
      >
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box flex="auto" width="70px">
        center
      </Box>
      <Box
        flex="auto"
        alignContent="center"
        height="200px"
        wrap
        gap="md"
        background="primary-lighter"
        direction="row"
      >
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box flex="auto" width="70px">
        end
      </Box>
      <Box
        flex="auto"
        alignContent="flex-end"
        height="200px"
        wrap
        gap="md"
        background="primary-lighter"
        direction="row"
      >
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box flex="auto" width="70px">
        stretch
      </Box>
      <Box
        flex="auto"
        alignContent="stretch"
        height="200px"
        wrap
        gap="md"
        background="primary-lighter"
        direction="row"
      >
        <Box width="2xl" background="primary" />
        <Box width="2xl" background="primary" />
        <Box width="2xl" background="primary" />
        <Box width="2xl" background="primary" />
        <Box width="2xl" background="primary" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box flex="auto" width="70px">
        between
      </Box>
      <Box
        flex="auto"
        alignContent="space-between"
        height="200px"
        wrap
        gap="md"
        background="primary-lighter"
        direction="row"
      >
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
      </Box>
    </Box>
    <Box direction="row" alignItems="center" gap="md">
      <Box flex="auto" width="70px">
        around
      </Box>
      <Box
        flex="auto"
        alignContent="center"
        height="200px"
        wrap
        gap="md"
        background="primary-lighter"
        direction="row"
      >
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
        <Box width="2xl" height="md" background="primary" />
      </Box>
    </Box>
  </Box>
);

export const FontColor = () => (
  <>
    <Box color="danger-500">Danger 500</Box>
    <Box color="info-500">Info 500</Box>
    <Box>Default Color</Box>
  </>
);

export const FontSize = () => {
  return (
    <>
      {[...FONT_SIZE_OPTIONS].reverse().map((fontSize, i) => (
        <Box fontSize={fontSize} key={i}>
          {`${fontSize} font size`}
        </Box>
      ))}
    </>
  );
};

export const FontWeight = () => (
  <Box>
    <Box fontWeight="light">light</Box>
    <Box fontWeight="regular">regular</Box>
    <Box fontWeight="medium">medium</Box>
    <Box fontWeight="bold">bold</Box>
    <Box fontWeight="black">black</Box>
  </Box>
);

export const FontFamily = () => (
  <>
    <Box fontFamily="body" margin="0 0 md 0" fontSize="xl">
      Body font
      <Box fontSize="sm">{FONT_FAMILY_VALUES['body'].value}</Box>
    </Box>
    <Box fontFamily="brand" margin="0 0 md 0" fontSize="xl">
      Brand Font
      <Box fontSize="sm">{FONT_FAMILY_VALUES['brand'].value}</Box>
    </Box>
    <Box fontFamily="monospace" margin="0 0 md 0" fontSize="xl">
      Monospace Font
      <Box fontSize="sm">{FONT_FAMILY_VALUES['monospace'].value}</Box>
    </Box>
  </>
);

export const TextAlign = () => (
  <Box display="block">
    <Box display="block" textAlign="left">
      left
    </Box>
    <Box display="block" textAlign="center">
      center
    </Box>
    <Box display="block" textAlign="right">
      right
    </Box>
  </Box>
);

export const Margin = () => (
  <>
    <Box margin="lg" background="primary-lighter">
      lg margin
    </Box>
    <Box margin="lg md" background="primary-lighter">
      lg vertical and md horizontal
    </Box>
    <Box margin="0 2xl" background="primary-lighter">
      0 vertical and 2xl horizontal
    </Box>
    <Box margin="sm md 2xl" background="primary-lighter">
      sm top, md horizontal, 2xl bottom
    </Box>
    <Box margin="sm lg 2xl 0" background="primary-lighter">
      sm top, lg right, 2xl bottom, 0 left
    </Box>
  </>
);

export const Padding = () => (
  <>
    <Box padding="lg" margin="sm 0" background="primary-lighter">
      lg padding
    </Box>
    <Box padding="lg md" margin="sm 0" background="primary-lighter">
      lg vertical and md horizontal
    </Box>
    <Box padding="0 2xl" margin="sm 0" background="primary-lighter">
      0 vertical and 2xl horizontal
    </Box>
    <Box padding="sm md 2xl" margin="sm 0" background="primary-lighter">
      sm top, md horizontal, 2xl bottom
    </Box>
    <Box padding="sm lg 2xl 0" margin="sm 0" background="primary-lighter">
      sm top, lg right, 2xl bottom, 0 left
    </Box>
  </>
);

export const Radius = () => (
  <>
    <Box direction="row" gap="2xs" justifyContent="space-between">
      <Box radius="xs" background="secondary-light" padding="sm">
        xs
      </Box>
      <Box radius="sm" background="secondary-light" padding="sm">
        sm
      </Box>
      <Box radius="md" background="secondary-light" padding="sm">
        md
      </Box>
      <Box radius="lg" background="secondary-light" padding="sm">
        lg
      </Box>
      <Box radius="circle" background="secondary-light" padding="sm">
        circle
      </Box>
      <Box radius="sm lg" background="secondary-light" padding="sm">
        sm lg
      </Box>
      <Box radius="sm md lg" background="secondary-light" padding="sm">
        sm md lg
      </Box>
      <Box radius="xs sm md lg" background="secondary-light" padding="sm">
        xs sm md lg
      </Box>
      <Box radius="0 0 md md" background="secondary-light" padding="sm">
        0 0 md md
      </Box>
      <Box radius="md md 0 0" background="secondary-light" padding="sm">
        md md 0 0
      </Box>
    </Box>
  </>
);

export const Shadow = () => (
  <Box
    direction="row"
    background="grey-50"
    padding="2xl"
    justifyContent="space-between"
  >
    <Box
      shadow="0"
      alignItems="center"
      justifyContent="center"
      background="white"
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
      background="white"
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
      background="white"
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
      background="white"
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
      background="white"
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
      background="white"
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
      background="white"
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
      background="white"
      radius="md"
      padding="sm"
      height="lg"
    >
      2xl
    </Box>
  </Box>
);

export const Width = () => (
  <Box background="primary-lightest" gap="xs">
    <Box background="primary-light" width="227px">
      227px
    </Box>
    <Box background="primary-light" width="10rem">
      10rem
    </Box>
    <Box background="primary-light" width="50%">
      50%
    </Box>
  </Box>
);

export const WidthTokens = () => (
  <Box background="primary-lightest" gap="xs" overflow="auto">
    <Box background="primary-light" width="sm">
      sm
    </Box>
    <Box background="primary-light" width="md">
      md
    </Box>
    <Box background="primary-light" width="lg">
      lg
    </Box>
    <Box background="primary-light" width="xl">
      xl
    </Box>
    <Box background="primary-light" width="2xl">
      2xl
    </Box>
    <Box background="primary-light" width="3xl">
      3xl
    </Box>
    <Box background="primary-light" width="4xl">
      4xl
    </Box>
    <Box background="primary-light" width="5xl">
      5xl
    </Box>
  </Box>
);

export const WidthPercentages = () => (
  <Box background="primary-lightest" gap="xs">
    <Box background="primary-light" width="10">
      10%
    </Box>
    <Box background="primary-light" width="15">
      15%
    </Box>
    <Box background="primary-light" width="20">
      20%
    </Box>
    <Box background="primary-light" width="25">
      25%
    </Box>
    <Box background="primary-light" width="30">
      30%
    </Box>
    <Box background="primary-light" width="33">
      33%
    </Box>
    <Box background="primary-light" width="34">
      34%
    </Box>
    <Box background="primary-light" width="40">
      40%
    </Box>
    <Box background="primary-light" width="50">
      50%
    </Box>
    <Box background="primary-light" width="60">
      60%
    </Box>
    <Box background="primary-light" width="70">
      70%
    </Box>
    <Box background="primary-light" width="75">
      75%
    </Box>
    <Box background="primary-light" width="80">
      80%
    </Box>
    <Box background="primary-light" width="90">
      90%
    </Box>
    <Box background="primary-light" width="100">
      100%
    </Box>
  </Box>
);

export const WidthMax = () => (
  <Box background="primary-lightest" gap="xs">
    <Box background="primary-light" maxWidth="2xl">
      2xl
    </Box>
    <Box background="primary-light" maxWidth="145px">
      145px
    </Box>
    <Box background="primary-light" maxWidth="50%">
      50%
    </Box>
  </Box>
);

export const WidthMin = () => (
  <Box alignItems="flex-start" background="primary-lightest" gap="xs">
    <Box background="primary-light" minWidth="2xl">
      2xl
    </Box>
    <Box background="primary-light" minWidth="145px">
      145px
    </Box>
    <Box background="primary-light" minWidth="50%">
      50%
    </Box>
  </Box>
);

export const Height = () => (
  <Box background="primary-lightest" gap="xs">
    <Box
      background="primary-light"
      height="227px"
      justifyContent="center"
      alignItems="center"
    >
      227px
    </Box>
    <Box
      background="primary-light"
      height="10rem"
      justifyContent="center"
      alignItems="center"
    >
      10rem
    </Box>
    <Box
      background="primary-light"
      height="4em"
      justifyContent="center"
      alignItems="center"
    >
      4em
    </Box>
  </Box>
);

export const HeightTokens = () => (
  <Box background="primary-lightest" gap="xs" height="5xl" direction="row">
    <Box
      flex="auto"
      background="primary-light"
      justifyContent="center"
      alignItems="center"
      height="sm"
    >
      sm
    </Box>
    <Box
      flex="auto"
      background="primary-light"
      justifyContent="center"
      alignItems="center"
      height="md"
    >
      md
    </Box>
    <Box
      flex="auto"
      background="primary-light"
      justifyContent="center"
      alignItems="center"
      height="lg"
    >
      lg
    </Box>
    <Box
      flex="auto"
      background="primary-light"
      justifyContent="center"
      alignItems="center"
      height="xl"
    >
      xl
    </Box>
    <Box
      flex="auto"
      background="primary-light"
      justifyContent="center"
      alignItems="center"
      height="2xl"
    >
      2xl
    </Box>
    <Box
      flex="auto"
      background="primary-light"
      justifyContent="center"
      alignItems="center"
      height="3xl"
    >
      3xl
    </Box>
    <Box
      flex="auto"
      background="primary-light"
      justifyContent="center"
      alignItems="center"
      height="4xl"
    >
      4xl
    </Box>
    <Box
      flex="auto"
      background="primary-light"
      justifyContent="center"
      alignItems="center"
      height="5xl"
    >
      5xl
    </Box>
  </Box>
);

export const HeightPercentages = () => (
  <Box height="400px" gap="xs" direction="row" background="primary-lightest">
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
      height="10"
    >
      10%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
      height="15"
    >
      15%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
      height="20"
    >
      20%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
      height="25"
    >
      25%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
      height="30"
    >
      30%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
      height="33"
    >
      33%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
      height="34"
    >
      34%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
      height="40"
    >
      40%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
      height="50"
    >
      50%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
      height="60"
    >
      60%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
      height="70"
    >
      70%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
      height="75"
    >
      75%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
      height="80"
    >
      80%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
      height="90"
    >
      90%
    </Box>
    <Box
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
      height="100"
    >
      100%
    </Box>
  </Box>
);

export const HeightMax = () => (
  <Box height="300px" background="primary-lightest" direction="row" gap="xs">
    <Box
      maxHeight="lg"
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
    >
      lg
    </Box>
    <Box
      maxHeight="50px"
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
    >
      50px
    </Box>
    <Box
      maxHeight="50%"
      flex="auto"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
    >
      50%
    </Box>
  </Box>
);

export const HeightMin = () => (
  <Box
    height="300px"
    background="primary-lightest"
    alignItems="flex-start"
    direction="row"
    gap="xs"
  >
    <Box
      width="33"
      minHeight="3xl"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
    >
      3xl
    </Box>
    <Box
      width="33"
      minHeight="50px"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
    >
      50px
    </Box>
    <Box
      width="33"
      minHeight="50%"
      justifyContent="center"
      alignItems="center"
      background="primary-light"
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
    background="primary-lighter"
    borderColor="grey"
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
  <Box
    padding="md"
    gap="md"
    flex="auto"
    background="primary-lighter"
    overflow="auto"
  >
    <Box cursor="pointer" padding="md" background="primary-light">
      pointer
    </Box>
    <Box cursor="move" padding="md" background="primary-light">
      move
    </Box>
    <Box cursor="not-allowed" padding="md" background="primary-light">
      not-allowed
    </Box>
    <Box cursor="grab" padding="md" background="primary-light">
      grab
    </Box>
    <Box cursor="zoom-in" padding="md" background="primary-light">
      zoom-in
    </Box>
    <Box cursor="zoom-out" padding="md" background="primary-light">
      zoom-out
    </Box>
  </Box>
);

export const Position = () => (
  <Box
    padding="md"
    childGap="md"
    display="block"
    background="primary-lighter"
    overflow="scroll"
    height="300px"
  >
    <Box
      position="absolute"
      padding="md"
      background="secondary-light"
      style={{ zIndex: 1 }}
      width="100px"
      height="150px"
    >
      absolute
    </Box>
    <Box
      position="relative"
      padding="md"
      background="primary-light"
      textAlign="right"
      height="200px"
    >
      relative
    </Box>
    <Box
      position="sticky"
      padding="md"
      background="tertiary-light"
      height="50px"
      color="white"
      style={{ top: 0, zIndex: 2 }}
    >
      sticky
    </Box>
    <Box
      position="static"
      padding="md"
      background="primary-light"
      height="400px"
    >
      static
    </Box>
  </Box>
);

export const Hover = () => (
  <Box gap="md">
    <Box
      padding="md"
      background="primary"
      color="white"
      shadow="xs"
      hover={{
        background: 'primary-dark',
      }}
      cursor="pointer"
    >
      simple background color effect
    </Box>
    <Box
      padding="md"
      background="white"
      color="primary"
      radius="md"
      borderWidth="xs"
      borderColor="primary"
      fontWeight="bold"
      direction="row"
      justifyContent="center"
      hover={{
        background: 'primary',
        color: 'white',
      }}
      cursor="pointer"
    >
      an outlined button
    </Box>
    <Box
      padding="md"
      radius="md"
      background="white"
      shadow="sm"
      borderWidth="xs"
      borderColor="grey-lightest"
      hover={{
        shadow: 'lg',
      }}
      cursor="grab"
    >
      Card shadow effect
    </Box>
    <Box
      padding="md"
      background="white"
      hover={{
        fontSize: 'xl',
      }}
    >
      growing text
    </Box>
    <Box
      padding="md"
      background="white"
      borderWidth="xs"
      borderColor="transparent"
      hover={{
        borderWidth: 'xs',
        borderColor: 'primary-500',
      }}
    >
      adding a border
    </Box>
    <Box
      padding="md"
      background="white"
      borderColor="grey-light"
      borderWidth="xs"
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
      background="white"
      color="dark"
      shadow="xs"
      borderWidth="xs"
      borderColor="grey-lighter"
      radius="md"
      style={{ outline: 'none' }}
      focus={{
        borderColor: 'grey',
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
    background="primary-100"
    borderColor="grey-300"
    padding={{ base: 'sm', tablet: 'md', desktop: 'lg', hd: 'xl' }}
    fontSize={{ base: 'md', tablet: 'lg', desktop: 'xl', hd: '3xl' }}
    borderWidth={{ base: 'sm', tablet: 'xs', desktop: 'md', hd: '0' }}
    textAlign={{ base: 'center', tablet: 'right', desktop: 'left' }}
  >
    <p>Resize the viewport to see how my appearance changes.</p>
  </Box>
);

export const Omit = () => (
  <Box padding={{ desktop: 'lg' }} background="primary-lighter">
    <p>
      This box will have no padding until the viewport reaches the desktop
      breakpoint.{' '}
    </p>
  </Box>
);
