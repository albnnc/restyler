import { Box, Demo, Heading } from 'docs/components/shared';
import React from 'react';
import { BasicDemo } from './BasicDemo';
import basicDemoCode from './BasicDemo.tsx?raw';
import { Blueprint } from './Blueprint';
import blueprintCode from './Blueprint.tsx?raw';

export const CollapsePage = () => {
  return (
    <>
      <Heading kind="2" margin={{ top: 'none' }}>
        Basic
      </Heading>
      <Box>
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
        fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
        sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia.
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
