import { Box, Demo, Heading } from 'docs/components/shared';
import { Fragment } from 'react';
import { BasicDemo } from './BasicDemo';
import basicDemoCode from './BasicDemo.tsx?raw';
import { ControlledSortDemo } from './ControlledSortDemo';
import controlledSortDemoCode from './ControlledSortDemo.tsx?raw';
import { DataTableDemo } from './DataTableDemo';
import dataTableDemoCode from './DataTableDemo.tsx?raw';

export const TablePage = () => {
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
      <Heading kind="2">DataTable</Heading>
      <Box>
        Etiam a dolor congue, posuere arcu sit amet, consectetur augue. Sed eget
        luctus lectus. Aliquam tortor augue, pharetra eget suscipit eget, porta
        sed massa. In at auctor odio, ut.
      </Box>
      <Demo code={dataTableDemoCode} margin={{ vertical: 'medium' }}>
        <DataTableDemo />
      </Demo>
      <Heading kind="2">Controlled Sort</Heading>
      <Demo code={controlledSortDemoCode} margin={{ vertical: 'medium' }}>
        <ControlledSortDemo />
      </Demo>
    </Fragment>
  );
};
