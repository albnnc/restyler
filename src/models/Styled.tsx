import { ComponentPropsWithRef, ForwardRefExoticComponent } from 'react';

export interface Styled {
  <Tag extends keyof JSX.IntrinsicElements, ExtraProps = {}>(
    tag: Tag,
    fn: (props: JSX.IntrinsicElements[Tag] & ExtraProps) => any
  ): ForwardRefExoticComponent<ComponentPropsWithRef<Tag> & ExtraProps>;
}
