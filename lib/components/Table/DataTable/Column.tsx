import { ReactNode } from 'react';
import { Sort } from './Sort';

export interface Column<TDatum> {
  header: ReactNode;
  isPrimary?: boolean;
  key: string;
  render?: (datum: TDatum) => ReactNode;
  sort?: Sort;
}
