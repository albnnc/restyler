import { ComponentPropsWithRef, ForwardRefExoticComponent } from 'react';
import { Style } from './Style';
import { StyleProps } from './StyleProps';

export interface ThemedOptions {
  path: string;
  style?: Style;
}

export interface Themed {
  <Tag extends keyof JSX.IntrinsicElements, ExtraProps = {}>(
    tag: Tag,
    options: ThemedOptions
  ): ForwardRefExoticComponent<
    ComponentPropsWithRef<Tag> & ExtraProps & StyleProps
  >;
}
