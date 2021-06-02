import React, {
  forwardRef,
  useMemo,
  useState,
  Fragment,
  ReactElement,
  ReactNode,
  Ref
} from 'react';
import { ComponentFactoryOptions } from '../../../models';
import { get } from '../../../utils';
import { TableProps } from '../Table';
import { Column } from './Column';
import { getSorted, getSortObject, useSortSelections } from './utils';

export interface DataTableProps<TDatum> extends TableProps {
  columns: Column<TDatum>[];
  data: TDatum[];
  expansion?: (datum: TDatum) => ReactNode;
  onRowClick?: (datum: TDatum) => void;
}

type DataTableFactory = (
  options: ComponentFactoryOptions
) => <TDatum extends object>(
  props: DataTableProps<TDatum> & React.RefAttributes<HTMLTableElement>
) => ReactElement | null;

export const createDataTable: DataTableFactory = ({ registry }) => {
  const { Table, TableCell, TableRow, TableBody, TableHead, Button } = registry;
  return forwardRef(
    <TDatum extends object>(
      { columns, data, expansion, onRowClick, ...rest }: DataTableProps<TDatum>,
      ref: Ref<HTMLTableElement>
    ) => {
      const [expansionValue, setExpansionValue] = useState<any>();
      const { sortSelections, toggleSortSelection } = useSortSelections(
        columns
      );
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
                const primaryValue = primaryKey && get(datum, primaryKey);
                return (
                  <Fragment key={`table-row-${rowIndex}`}>
                    <TableRow
                      onClick={() => {
                        onRowClick?.(datum);
                        if (expansion) {
                          setExpansionValue(
                            expansionValue === primaryValue
                              ? undefined
                              : primaryValue
                          );
                        }
                      }}
                    >
                      {columns.map(({ key, render }, columnIndex) => (
                        <TableCell
                          key={`table-cell-${rowIndex}-${columnIndex}`}
                          kind={
                            expansion || onRowClick ? 'hoverable' : undefined
                          }
                        >
                          {render ? render(datum) : get(datum, key)}
                        </TableCell>
                      ))}
                    </TableRow>
                    {expansion && expansionValue === primaryValue && (
                      <TableRow>
                        <TableCell colSpan={columns.length}>
                          {expansion(datum) || null}
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell kind="empty" colSpan={columns.length}>
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
    }
  );
};
