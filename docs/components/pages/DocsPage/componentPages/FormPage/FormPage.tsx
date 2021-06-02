import { Box, Demo, Heading } from 'docs/components/shared';
import React from 'react';
import { AddonsDemo } from './AddonsDemo';
import addonsDemoCode from './AddonsDemo.tsx?raw';
import { BasicDemo } from './BasicDemo';
import basicDemoCode from './BasicDemo.tsx?raw';
import { RowDemo } from './RowDemo';
import rowDemoCode from './RowDemo.tsx?raw';

export const FormPage = () => {
  return (
    <>
      <Heading kind="2" margin={{ top: 'none' }}>
        Basic
      </Heading>
      <Box>
        Pellentesque vulputate eleifend orci, vitae vehicula odio porttitor ut.
        Vestibulum iaculis at velit id faucibus.
      </Box>
      <Demo code={basicDemoCode} margin={{ vertical: 'medium' }}>
        <BasicDemo />
      </Demo>
      <Heading kind="2" margin={{ top: 'none' }}>
        Row
      </Heading>
      <Demo code={rowDemoCode} margin={{ vertical: 'medium' }}>
        <RowDemo />
      </Demo>
      <Heading kind="2" margin={{ top: 'none' }}>
        Addons
      </Heading>
      <Demo code={addonsDemoCode} margin={{ vertical: 'medium' }}>
        <AddonsDemo />
      </Demo>
    </>
  );
};
