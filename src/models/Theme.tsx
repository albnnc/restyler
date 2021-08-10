import { Style } from './Style';
import { Variables } from './Variables';

export interface StyleFn<Props = any> {
  (props: Props): Style;
}

export interface Theme {
  variables?: Variables;
  style?: Style | StyleFn | (Style | StyleFn)[];
  kinds?: { [kind: string]: Theme };
  [other: string]: any;
}
