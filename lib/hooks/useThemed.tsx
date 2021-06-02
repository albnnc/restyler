import React, {
  forwardRef,
  useContext,
  ComponentPropsWithRef,
  ForwardRefExoticComponent
} from 'react';
import { SystemContext } from '../components';
import { Style, StyleProps, Theme } from '../models';
import {
  createStyle,
  filterStyleProps,
  get,
  merge,
  mergeThemes
} from '../utils';

export const useThemed = <
  Tag extends keyof JSX.IntrinsicElements,
  ExtraProps = {}
>(
  tag: Tag,
  options: { path: string; style?: Style }
): ForwardRefExoticComponent<
  ComponentPropsWithRef<Tag> & StyleProps & ExtraProps
> => {
  const { path, style } = options;
  const { styled, registry } = useContext(SystemContext);
  if (registry[path]) {
    return registry[path];
  }

  const ThemedComponent = styled<Tag, StyleProps & ExtraProps>(tag, props => {
    const { styleProps, ...rest } = filterStyleProps(props);
    const defaultStyleProps = styleProps.theme?.defaults ?? {};
    const themeStyleProps = get(styleProps.theme, path ?? '') ?? {};
    const kindStyleProps = themeStyleProps.kinds?.[styleProps.kind] ?? {};
    const mergedStyleProps = mergeThemes(
      {},
      defaultStyleProps,
      themeStyleProps,
      kindStyleProps,
      styleProps
    ) as Theme;
    return merge(
      {},
      style,
      createStyle({
        variables: styleProps.theme.variables,
        props: { ...mergedStyleProps, ...rest }
      })
    );
  });

  // TODO: remove `any`
  registry[path] = forwardRef<Tag, any>((props, ref) => {
    const { theme } = useContext(SystemContext);
    return <ThemedComponent ref={ref} theme={theme} {...props} />;
  });

  return registry[path];
};
