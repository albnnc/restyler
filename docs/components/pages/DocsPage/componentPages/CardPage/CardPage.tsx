import { Box, Demo, Heading } from 'docs/components/shared';
import { Fragment } from 'react';
import { BasicDemo } from './BasicDemo';
import basicDemoCode from './BasicDemo.tsx?raw';
import { Blueprint } from './Blueprint';
import blueprintCode from './Blueprint.tsx?raw';
import { ComplexDemo } from './ComplexDemo';
import complexDemoCode from './ComplexDemo.tsx?raw';

export const CardPage = () => {
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
      <Demo
        code={basicDemoCode}
        contentProps={{ flex: '0 1 400px' }}
        margin={{ vertical: 'medium' }}
      >
        <BasicDemo />
      </Demo>
      <Heading kind="2">Complex</Heading>
      <Demo
        code={complexDemoCode}
        contentProps={{ flex: '0 1 400px' }}
        margin={{ vertical: 'medium' }}
      >
        <ComplexDemo />
      </Demo>
      <Heading kind="2">Blueprint</Heading>
      <Demo
        code={blueprintCode}
        contentProps={{ flex: '0 1 400px' }}
        margin={{ vertical: 'medium' }}
      >
        <Blueprint />
      </Demo>
    </Fragment>
  );
};
