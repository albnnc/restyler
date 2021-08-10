import { Style } from './Style';

export interface StyleFn<Props = any> {
  (props: Props): Style;
}

export interface Theme {
  style?: Style | StyleFn | (Style | StyleFn)[];
  kinds?: { [kind: string]: Theme };
  [other: string]: any;
}
