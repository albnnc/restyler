import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'docs/components/shared';
import React from 'react';

export const BasicDemo = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Flavor</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Eric</TableCell>
          <TableCell>Coconut</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>Chris</TableCell>
          <TableCell>Watermelon</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>3</TableCell>
          <TableCell>Ann</TableCell>
          <TableCell>Strawberry</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
