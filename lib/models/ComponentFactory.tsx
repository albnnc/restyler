import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes
} from 'react';
import { Registry } from '~lib/registry';
import { Locale } from './Locale';
import { Themed } from './Themed';

export interface ComponentFactoryOptions {
  locale: Locale;
  registry: Registry;
  themed: Themed;
}

export interface ComponentFactory<TElement extends HTMLElement, TProps> {
  (options: ComponentFactoryOptions): ForwardRefExoticComponent<
    PropsWithoutRef<TProps> & RefAttributes<TElement>
  >;
}
