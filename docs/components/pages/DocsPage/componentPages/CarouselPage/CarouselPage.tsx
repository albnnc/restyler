import React from 'react';
import { Box, Demo, Heading } from '~docs/components/shared';
import { AutoPlayDemo } from './AutoPlayDemo';
import autoPlayDemoCode from './AutoPlayDemo.tsx?raw';
import { BasicDemo } from './BasicDemo';
import basicDemoCode from './BasicDemo.tsx?raw';
import { InfiniteDemo } from './InfiniteDemo';
import infiniteDemoCode from './InfiniteDemo.tsx?raw';

export const CarouselPage = () => {
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
        Infinite
      </Heading>
      <Box>
        Etiam a dolor congue, posuere arcu sit amet, consectetur augue. Sed eget
        luctus lectus. Aliquam tortor augue, pharetra eget suscipit eget, porta
        sed massa. In at auctor odio, ut.
      </Box>
      <Demo code={infiniteDemoCode} margin={{ vertical: 'medium' }}>
        <InfiniteDemo />
      </Demo>
      <Heading kind="2" margin={{ top: 'none' }}>
        Auto Play
      </Heading>
      <Box>
        Etiam a dolor congue, posuere arcu sit amet, consectetur augue. Sed eget
        luctus lectus. Aliquam tortor augue, pharetra eget suscipit eget, porta
        sed massa. In at auctor odio, ut.
      </Box>
      <Demo code={autoPlayDemoCode} margin={{ vertical: 'medium' }}>
        <AutoPlayDemo />
      </Demo>
    </>
  );
};
