import { Style } from './Style';
import { BasicStyleProps } from './StyleProps';
import { Variables } from './Variables';

export interface StyleFactoryOptions<T extends BasicStyleProps> {
  props: T;
  variables: Variables;
}

export interface StyleFactory<T extends BasicStyleProps> {
  (options: StyleFactoryOptions<T>): Style;
}
