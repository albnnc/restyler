import React, {
  forwardRef,
  useContext,
  ComponentPropsWithRef,
  ForwardRefExoticComponent
} from 'react';
import { SystemContext } from '../components';
import { Style, StyleProps, Theme } from '../models';
import {
  capitalizeFirst,
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
  const token = `${tag}.${path}`;
  if (registry[token]) {
    return registry[token];
  }

  const displayName = path
    .split('.')
    .map(v => capitalizeFirst(v))
    .join('');

  const StyledComponent = styled<Tag, StyleProps & ExtraProps>(tag, props => {
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
  StyledComponent.displayName = 'Styled' + displayName;

  const ThemedComponent = forwardRef<Tag, any>((props, ref) => {
    const { theme } = useContext(SystemContext);
    return <StyledComponent ref={ref} theme={theme} {...props} />;
  });
  ThemedComponent.displayName = 'Themed' + displayName;

  registry[token] = ThemedComponent;

  return registry[token];
};
