import { Box, Demo, Heading } from 'docs/components/shared';
import React from 'react';
import { BasicDemo } from './BasicDemo';
import basicDemoCode from './BasicDemo.tsx?raw';
import { SmartDemo } from './SmartDemo';
import smartDemoCode from './SmartDemo.tsx?raw';

export const TablePage = () => {
  return (
    <>
      <Heading kind="2" margin={{ top: 'none' }}>
        Basic
      </Heading>
      <Box>
        Etiam a dolor congue, posuere arcu sit amet, consectetur augue. Sed eget
        luctus lectus. Aliquam tortor augue, pharetra eget suscipit eget, porta
        sed massa. In at auctor odio, ut.
      </Box>
      <Demo code={basicDemoCode} margin={{ vertical: 'medium' }}>
        <BasicDemo />
      </Demo>
      <Heading kind="2" margin={{ top: 'none' }}>
        Smart
      </Heading>
      <Box>
        Etiam a dolor congue, posuere arcu sit amet, consectetur augue. Sed eget
        luctus lectus. Aliquam tortor augue, pharetra eget suscipit eget, porta
        sed massa. In at auctor odio, ut.
      </Box>
      <Demo code={smartDemoCode} margin={{ vertical: 'medium' }}>
        <SmartDemo />
      </Demo>
    </>
  );
};
