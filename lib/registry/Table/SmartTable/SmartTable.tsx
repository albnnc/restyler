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
  caption?: ReactNode;
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
  const {
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableHead,
    Button,
    TableCaption
  } = registry;
  return forwardRef(
    <TDatum extends object>(
      {
        columns,
        data,
        primaryKey,
        caption,
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
          {caption && <TableCaption>{caption}</TableCaption>}
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
                        kind={`arrow-${
                          sortSelection?.direction === 'asc' ? 'up' : 'down'
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
            {sorted.map((datum, rowIndex) => {
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
                        kind={expansion || onRowClick ? 'hoverable' : undefined}
                      >
                        {render ? render(get(datum, key)) : get(datum, key)}
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
            })}
          </TableBody>
        </Table>
      );
    }
  );
};
