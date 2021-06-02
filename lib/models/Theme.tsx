import { Style } from './Style';
import { BasicStyleProps } from './StyleProps';
import { Variables } from './Variables';

export type Extend = Function | Style | (Function | Style)[];

// tslint:disable:member-ordering
export interface Theme extends BasicStyleProps {
  /** CSS generator to extend StyleProps. */
  extend?: Extend;

  /** Only top-level variables are supported currently. */
  variables?: Variables;

  /** Custom kinds of current component. */
  kinds?: { [kind: string]: Theme };

  /** Sub-component themes. */
  [other: string]: any;
}
// tslint:enable:member-ordering
