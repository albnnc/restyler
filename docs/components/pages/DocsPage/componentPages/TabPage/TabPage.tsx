import React from 'react';
import { Box, Demo, Heading } from '~docs/components/shared';
import { BasicDemo } from './BasicDemo';
import basicDemoCode from './BasicDemo.tsx?raw';
import { CardDemo } from './CardDemo';
import cardDemoCode from './CardDemo.tsx?raw';

export const TabPage = () => {
  return (
    <>
      <Heading kind="2" margin={{ top: 'none' }}>
        Basic
      </Heading>
      <Box>
        Pellentesque vulputate eleifend orci, vitae vehicula odio porttitor ut.
        Vestibulum iaculis at velit id faucibus. Etiam a dolor congue, posuere
        arcu sit amet, consectetur augue. ut.
      </Box>
      <Demo code={basicDemoCode} margin={{ vertical: 'medium' }}>
        <BasicDemo />
      </Demo>
      <Heading kind="2" margin={{ top: 'none' }}>
        Card
      </Heading>
      <Demo code={cardDemoCode} margin={{ vertical: 'medium' }}>
        <CardDemo />
      </Demo>
    </>
  );
};
