import React, {
  forwardRef,
  useContext,
  ComponentPropsWithRef,
  ForwardRefExoticComponent
} from 'react';
import { SystemContext } from '../components';
import { ThemeProps, Theme } from '../models';
import {
  capitalizeFirst,
  createStyle,
  get,
  merge,
  mergeThemes
} from '../utils';

export const useThemed = <
  Tag extends keyof JSX.IntrinsicElements,
  ExtraProps = {}
>(
  tag: Tag,
  path: string
): ForwardRefExoticComponent<
  ComponentPropsWithRef<Tag> & ThemeProps & ExtraProps
> => {
  const { styled, registry } = useContext(SystemContext);
  const token = `${tag}:${path}`;
  if (registry[token]) {
    return registry[token];
  }

  const displayName = path
    .split('.')
    .map(v => capitalizeFirst(v))
    .join('');

  const StyledComponent = styled<Tag, ThemeProps & ExtraProps>(tag, props => {
    const { theme, kind } = props;
    const { kinds, ...componentTheme } =
      get(theme?.components ?? {}, path ?? '') ?? {};
    const componentKindTheme = kinds?.[kind ?? ''] ?? {};
    const mergedTheme = mergeThemes(
      {},
      theme?.defaults ?? {},
      componentTheme,
      componentKindTheme
    ) as Theme;
    return merge({}, createStyle(mergedTheme, props)); // FIXME
  });
  StyledComponent.displayName = 'Styled' + displayName;

  const ThemedComponent = forwardRef<any, any>((props, ref) => {
    const { theme } = useContext(SystemContext);
    return <StyledComponent ref={ref} theme={theme} {...props} />;
  });
  ThemedComponent.displayName = 'Themed' + displayName;

  registry[token] = ThemedComponent;

  return registry[token];
};
