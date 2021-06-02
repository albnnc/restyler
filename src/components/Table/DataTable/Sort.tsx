export type Comparator = (a: any, b: any) => 1 | 0 | -1;

export type SortDirection = 'asc' | 'desc';

export type Sort =
  | boolean
  | {
      comparator?: Comparator;
      defaultDirection?: SortDirection;
      direction?: SortDirection;
    };

export interface SortSelection {
  comparator?: Comparator;
  direction: SortDirection;
  key: string;
}
