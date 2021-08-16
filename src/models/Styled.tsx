import { ComponentPropsWithRef, ForwardRefExoticComponent } from 'react';

export interface Styled<T = any> {
  <Tag extends keyof JSX.IntrinsicElements, ExtraProps = {}>(
    tag: Tag,
    fn: (props: JSX.IntrinsicElements[Tag] & ExtraProps) => T
  ): ForwardRefExoticComponent<ComponentPropsWithRef<Tag> & ExtraProps>;
}
