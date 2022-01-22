import { ReactNode } from 'react';
import { Sort } from './Sort';

export interface Column<Datum> {
  header: ReactNode;
  isPrimary?: boolean;
  key: string;
  render?: (datum: Datum) => ReactNode;
  sort?: Sort;
}
