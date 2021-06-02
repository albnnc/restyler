import { ReactNode } from 'react';
import { TableProps } from '../Table';
import { Column } from './Column';

export interface DataTableProps<TDatum> extends TableProps {
  columns: Column<TDatum>[];
  data: TDatum[];
  expansion?: (datum: TDatum) => ReactNode;
  onRowClick?: (datum: TDatum) => void;
}
