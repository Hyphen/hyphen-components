import React from 'react';
import type { Meta } from '@storybook/react-vite';
import { AspectRatio } from './AspectRatio';
import { Box } from '../Box/Box';

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
};

export default meta;

export const Usage = () => (
  <Box width="9xl">
    <AspectRatio ratio={16 / 9}>
      <img
        className="Image"
        src="https://images.unsplash.com/photo-1750688650545-d9e2a060dfe8?q=80&w=512&auto=format&fit=crop"
        alt="Landscape photograph by Jonas Degener"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
      />
    </AspectRatio>
  </Box>
);
