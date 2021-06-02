import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes
} from 'react';
import { Registry } from '../registry';
import { Locale } from './Locale';
import { Themed } from './Themed';

export interface ComponentFactoryOptions {
  locale: Locale;
  registry: Registry;
  themed: Themed;
}

export interface ComponentFactory<TElement extends Element, TProps> {
  (options: ComponentFactoryOptions): ForwardRefExoticComponent<
    PropsWithoutRef<TProps> & RefAttributes<TElement>
  >;
}
