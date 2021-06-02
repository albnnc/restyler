import { Box, Demo, Heading } from 'docs/components/shared';
import { Fragment } from 'react';
import { BasicDemo } from './BasicDemo';
import basicDemoCode from './BasicDemo.tsx?raw';
import { CustomLabelDemo } from './CustomLabelDemo';
import customLabelDemoCode from './CustomLabelDemo.tsx?raw';

export const FilePage = () => {
  return (
    <Fragment>
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
        Custom
      </Heading>
      <Box>
        Pellentesque vulputate eleifend orci, vitae vehicula odio porttitor ut.
        Vestibulum iaculis at velit id faucibus. Etiam a dolor congue, posuere
        arcu sit amet, consectetur augue. ut.
      </Box>
      <Demo code={customLabelDemoCode} margin={{ vertical: 'medium' }}>
        <CustomLabelDemo />
      </Demo>
    </Fragment>
  );
};
