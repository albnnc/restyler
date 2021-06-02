import { Box, Demo, Heading } from 'docs/components/shared';
import { Fragment } from 'react';
import { BasicDemo } from './BasicDemo';
import basicDemoCode from './BasicDemo.tsx?raw';
import { OpenDemo } from './OpenDemo';
import openDemoCode from './OpenDemo.tsx?raw';

export const NotificationPage = () => {
  return (
    <Fragment>
      <Heading kind="2" margin={{ top: 'none' }}>
        Basic
      </Heading>
      <Box>
        Pellentesque vulputate eleifend orci, vitae vehicula odio porttitor ut.
        Vestibulum iaculis at velit id faucibus. Etiam a dolor congue, posuere
        arcu sit amet, consectetur augue. Sed eget luctus lectus. Aliquam tortor
        augue, pharetra eget suscipit eget, porta sed massa. In at auctor odio,
        ut.
      </Box>
      <Demo code={basicDemoCode} margin={{ vertical: 'medium' }}>
        <BasicDemo />
      </Demo>
      <Heading kind="2" margin={{ top: 'none' }}>
        Open
      </Heading>
      <Demo code={openDemoCode} margin={{ vertical: 'medium' }}>
        <OpenDemo />
      </Demo>
    </Fragment>
  );
};
