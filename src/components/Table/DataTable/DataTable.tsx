import React, { forwardRef, useContext, useMemo } from 'react';
import { hash } from '../../../utils';
import { Button } from '../../Button';
import { SystemContext } from '../../SystemContext';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableHead } from '../TableHead';
import { TableRow } from '../TableRow';
import { DataRow } from './DataRow';
import { DataTableProps } from './DataTableProps';
import { getSorted, getSortObject, useSortSelections } from './utils';

export const DataTable = forwardRef<HTMLTableElement, DataTableProps<any>>(
  ({ columns, data, expansion, getRowProps, ...rest }, ref) => {
    const { locale } = useContext(SystemContext);
    const { sortSelections, toggleSortSelection } = useSortSelections(columns);
    const sorted = useMemo(
      () =>
        sortSelections.reduce(
          (prev, curr) => getSorted(prev, curr),
          data.slice()
        ),
      [data, sortSelections]
    );
    const primaryKey = useMemo(() => {
      const primaryColumn = columns.find(v => v.isPrimary);
      const primaryKey = primaryColumn?.key ?? columns[0]?.key;
      if (!primaryKey) {
        throw new Error('No primary key found');
      }
      return primaryKey;
    }, [columns]);
    return (
      <Table ref={ref} {...rest}>
        <TableHead>
          <TableRow>
            {columns.map(({ key, header, sort }, i) => {
              const sortSelection = sortSelections.find(v => v.key === key);
              return (
                <TableCell
                  key={`column-header-${i}-${key}`}
                  kind={
                    sort && !getSortObject(sort).direction
                      ? 'hoverable'
                      : undefined
                  }
                  onClick={() => sort && toggleSortSelection(key)}
                >
                  {header}
                  {sortSelection && (
                    <Button
                      kind={
                        'arrow' +
                        (sortSelection.direction === 'asc' ? 'Up' : 'Down')
                      }
                      margin={{ left: 'small' }}
                    />
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.length > 0 ? (
            sorted.map((datum, rowIndex) => {
              const primaryValue = datum?.[primaryKey];
              const hashValue = hash(primaryValue);
              return (
                <DataRow
                  key={`table-row-${rowIndex}-${hashValue}`}
                  columns={columns}
                  datum={datum}
                  expansion={expansion}
                  rowIndex={rowIndex}
                  {...getRowProps?.(datum)}
                />
              );
            })
          ) : (
            <TableRow>
              <TableCell kind="empty" colSpan={columns.length}>
                {locale.emptyText}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
);

DataTable.displayName = 'DataTable';
