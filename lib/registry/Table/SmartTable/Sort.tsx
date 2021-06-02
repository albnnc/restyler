export type Comparator = <T extends object>(a: T, b: T) => 1 | 0 | -1;

export type Sort =
  | boolean
  | {
      comparator?: Comparator;
      defaultDirection?: 'asc' | 'desc';
    };

export interface SortSelection {
  comparator?: Comparator;
  direction: 'asc' | 'desc';
  key: string;
}
