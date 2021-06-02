import { Box, Demo, Heading } from 'docs/components/shared';
import { Fragment } from 'react';
import { BasicDemo } from './BasicDemo';
import basicDemoCode from './BasicDemo.tsx?raw';
import { NestedDemo } from './NestedDemo';
import nestedDemoCode from './NestedDemo.tsx?raw';
import { OpenDemo } from './OpenDemo';
import openDemoCode from './OpenDemo.tsx?raw';
import { QuestionDemo } from './QuestionDemo';
import questionDemoCode from './QuestionDemo.tsx?raw';

export const ModalPage = () => {
  return (
    <Fragment>
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
      <Heading kind="2">Open</Heading>
      <Demo code={openDemoCode} margin={{ vertical: 'medium' }}>
        <OpenDemo />
      </Demo>
      <Heading kind="2">Nested</Heading>
      <Demo code={nestedDemoCode} margin={{ vertical: 'medium' }}>
        <NestedDemo />
      </Demo>
      <Heading kind="2">Question</Heading>
      <Demo code={questionDemoCode} margin={{ vertical: 'medium' }}>
        <QuestionDemo />
      </Demo>
    </Fragment>
  );
};
