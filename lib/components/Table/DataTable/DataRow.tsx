import React, { useState, Fragment } from 'react';
import { get, hash } from '../../../utils';
import { TableCell } from '../TableCell';
import { TableRow } from '../TableRow';
import { DataTableProps } from './DataTableProps';

interface DataRowProps<TDatum> extends DataTableProps<TDatum> {
  datum: TDatum;
  rowIndex: number;
}

export const DataRow = ({
  columns,
  expansion,
  onRowClick,
  datum,
  rowIndex
}: DataRowProps<any>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Fragment>
      <TableRow
        onClick={() => {
          onRowClick?.(datum);
          if (expansion) {
            setIsOpen(!isOpen);
          }
        }}
      >
        {columns.map(({ key, render }, columnIndex) => {
          const hashValue = hash(datum?.[key]);
          return (
            <TableCell
              key={`table-cell-${rowIndex}-${columnIndex}-${hashValue}`}
              kind={expansion || onRowClick ? 'hoverable' : undefined}
            >
              {render?.(datum) ?? get(datum, key)}
            </TableCell>
          );
        })}
      </TableRow>
      {expansion && isOpen && (
        <TableRow>
          <TableCell colSpan={columns.length}>
            {expansion(datum) ?? null}
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
};
