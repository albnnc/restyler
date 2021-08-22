/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Table, TableHead } from 'src';
import { compact } from 'storybook/decorators';
import { createBlueprint } from 'storybook/utils';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableRow } from './TableRow';

export default {
  title: 'Data/Table',
  decorators: [compact()]
} as Meta;

export const Basics = () => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>#</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Age</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>1</TableCell>
        <TableCell>John</TableCell>
        <TableCell>30</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>2</TableCell>
        <TableCell>Rebecca</TableCell>
        <TableCell>25</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>3</TableCell>
        <TableCell>Albert</TableCell>
        <TableCell>45</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const Blueprint = createBlueprint('table');
