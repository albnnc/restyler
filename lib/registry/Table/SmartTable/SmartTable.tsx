import React, {
  forwardRef,
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
import { getSorted, useSortSelections } from './utils';

export interface SmartTableProps<TDatum> extends TableProps {
  columns: Column<TDatum>[];
  data: TDatum[];
  expansion?: (datum: TDatum) => ReactNode;
  onRowClick?: (datum: TDatum) => void;
  primaryKey?: string;
}

type SmartTableFactory = (
  options: ComponentFactoryOptions
) => <TDatum extends object>(
  props: SmartTableProps<TDatum> & React.RefAttributes<HTMLTableElement>
) => ReactElement | null;

export const createSmartTable: SmartTableFactory = ({ registry }) => {
  const { Table, TableCell, TableRow, TableBody, TableHead, Button } = registry;
  return forwardRef(
    <TDatum extends object>(
      {
        columns,
        data,
        primaryKey,
        expansion,
        onRowClick,
        ...rest
      }: SmartTableProps<TDatum>,
      ref: Ref<HTMLTableElement>
    ) => {
      const [expansionValue, setExpansionValue] = useState<
        string | undefined
      >();
      const { sortSelections, toggleSortSelection } = useSortSelections(
        columns
      );
      const sorted = sortSelections.reduce(
        (prev, curr) => getSorted(prev, curr),
        data.slice()
      );

      return (
        <Table ref={ref} {...rest}>
          <TableHead>
            <TableRow>
              {columns.map(({ key, header, sort }, i) => {
                const sortSelection = sortSelections.find(v => v.key === key);
                return (
                  <TableCell
                    key={`column-header-${i}-${key}`}
                    kind={sort ? 'hoverable' : undefined}
                    onClick={() => sort && toggleSortSelection(key)}
                  >
                    {header}
                    {sortSelection && (
                      <Button
                        kind={`arrow${
                          sortSelection?.direction === 'asc' ? 'Up' : 'Down'
                        }`}
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
                  <Fragment key={`table-row-${primaryValue || rowIndex}`}>
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
                          {render
                            ? render(get(datum, key), datum)
                            : get(datum, key)}
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
