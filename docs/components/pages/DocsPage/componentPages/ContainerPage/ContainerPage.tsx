import React from 'react';
import { Box, Demo, Heading } from '~docs/components/shared';
import { BasicDemo } from './BasicDemo';
import basicDemoCode from './BasicDemo.tsx?raw';
import { Blueprint } from './Blueprint';
import blueprintCode from './Blueprint.tsx?raw';

export const ContainerPage = () => {
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
      <Heading kind="2">Blueprint</Heading>
      <Demo code={blueprintCode}>
        <Blueprint />
      </Demo>
    </>
  );
};
