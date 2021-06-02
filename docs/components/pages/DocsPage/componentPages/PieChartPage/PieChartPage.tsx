import { Box, Demo, Heading } from 'docs/components/shared';
import { Fragment } from 'react';
import { BasicDemo } from './BasicDemo';
import basicDemoCode from './BasicDemo.tsx?raw';
import { SmallDemo } from './SmallDemo';
import smallDemoCode from './SmallDemo.tsx?raw';

export const PieChartPage = () => {
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
      <Demo
        code={basicDemoCode}
        margin={{ vertical: 'medium' }}
        contentProps={{ flex: '0 1 250px' }}
      >
        <BasicDemo />
      </Demo>
      <Heading kind="2" margin={{ top: 'none' }}>
        Small
      </Heading>
      <Demo code={smallDemoCode} margin={{ vertical: 'medium' }}>
        <SmallDemo />
      </Demo>
    </Fragment>
  );
};
