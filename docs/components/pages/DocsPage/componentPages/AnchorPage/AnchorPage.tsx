import React from 'react';
import { Box, Demo, Heading } from '~docs/components/shared';
import { BasicDemo } from './BasicDemo';
import basicDemoCode from './BasicDemo.tsx?raw';
import { Blueprint } from './Blueprint';
import blueprintCode from './Blueprint.tsx?raw';

export const AnchorPage = () => {
  return (
    <>
      <Heading kind="2" margin={{ top: 'none' }}>
        Basic
      </Heading>
      <Box>
        Nulla facilisi. Ut elit dolor, feugiat id est porta, eleifend imperdiet
        dui. Pellentesque vulputate eleifend orci, vitae vehicula odio porttitor
        ut. Vestibulum iaculis at velit id faucibus. Etiam a dolor congue,
        posuere arcu sit amet, consectetur augue. Sed eget luctus lectus.
      </Box>
      <Demo margin={{ vertical: 'medium' }} code={basicDemoCode}>
        <BasicDemo />
      </Demo>
      <Heading kind="2">Blueprint</Heading>
      <Demo margin={{ vertical: 'medium' }} code={blueprintCode}>
        <Blueprint />
      </Demo>
    </>
  );
};
