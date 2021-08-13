import { ComponentPropsWithRef, ForwardRefExoticComponent } from 'react';
import { Style } from './Style';

export interface Styled {
  <Tag extends keyof JSX.IntrinsicElements, ExtraProps = {}>(
    tag: Tag,
    fn: (props: JSX.IntrinsicElements[Tag] & ExtraProps) => Style
  ): ForwardRefExoticComponent<ComponentPropsWithRef<Tag> & ExtraProps>;
}
