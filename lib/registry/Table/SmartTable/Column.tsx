import { ReactNode } from 'react';
import { Sort } from './Sort';

export interface Column<TDatum> {
  header: ReactNode;
  key: string;
  render?: (value: any, datum?: TDatum) => ReactNode;
  sort?: Sort;
}
