export type Comparator = <T extends object>(a: T, b: T) => 1 | 0 | -1;

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
