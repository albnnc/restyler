export interface Theme<T = any> {
  style?: T | ((props: object) => T);
  kinds?: { [kind: string]: Theme<T> };
  [other: string]: any;
}
