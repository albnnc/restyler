import { Box, Demo, Heading } from 'docs/components/shared';
import { Fragment } from 'react';
import { BasicDemo } from './BasicDemo';
import basicDemoCode from './BasicDemo.tsx?raw';
import { CompoundLoaderDemo } from './CompoundLoaderDemo';
import compoundLoaderDemo from './CompoundLoaderDemo.tsx?raw';
import { SharedLoaderDemo } from './SharedLoaderDemo';
import sharedLoaderDemoCode from './SharedLoaderDemo.tsx?raw';

export const LoaderPage = () => {
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
      <Heading kind="2">Shared Loader</Heading>
      <Demo code={sharedLoaderDemoCode} margin={{ vertical: 'medium' }}>
        <SharedLoaderDemo />
      </Demo>
      <Heading kind="2">Compound Loader</Heading>
      <Demo code={compoundLoaderDemo} margin={{ vertical: 'medium' }}>
        <CompoundLoaderDemo />
      </Demo>
    </Fragment>
  );
};
