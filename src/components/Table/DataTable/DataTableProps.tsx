import { ReactNode } from 'react';
import { TableProps } from '../Table';
import { Column } from './Column';

export interface DataTableProps<Datum> extends TableProps {
  columns: Column<Datum>[];
  data: Datum[];
  expansion?: (datum: Datum) => ReactNode;
  getRowProps?: (datum: Datum) => void;
}
