import React, { useMemo, useState, Fragment, ReactNode } from 'react';
import { get, hash } from '../../../utils';
import { TableCell } from '../TableCell';
import { TableRow, TableRowProps } from '../TableRow';
import { Column } from './Column';

interface DataRowProps<Datum> extends TableRowProps {
  columns: Column<Datum>[];
  datum: Datum;
  expansion?: (datum: Datum) => ReactNode;
  rowIndex: number;
}

export const DataRow = ({
  columns,
  expansion,
  datum,
  rowIndex,
  onClick,
  ...rest
}: DataRowProps<any>) => {
  const [isOpen, setIsOpen] = useState(false);
  return useMemo(
    () => (
      <Fragment>
        <TableRow
          onClick={() => {
            onClick?.(datum);
            if (expansion) {
              setIsOpen(!isOpen);
            }
          }}
          {...rest}
        >
          {columns.map(({ key, render }, columnIndex) => {
            const hashValue = hash(datum?.[key]);
            return (
              <TableCell
                key={`table-cell-${rowIndex}-${columnIndex}-${hashValue}`}
                kind={expansion || onClick ? 'hoverable' : undefined}
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
    ),
    [
      isOpen,
      columns,
      expansion,
      datum,
      rowIndex,
      onClick,
      Reflect.ownKeys(rest).length
    ]
  );
};

DataRow.displayName = 'DataRow';
