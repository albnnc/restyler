import React, {
  forwardRef,
  useContext,
  ComponentPropsWithRef,
  ForwardRefExoticComponent
} from 'react';
import { SystemContext } from '../components';
import { Style, Theme } from '../models';
import { capitalizeFirst, get, merge, mergeThemes } from '../utils';

const createStyle = (theme: Theme, props: any) => {
  const { style } = theme;
  const result = {} as Style;
  for (const item of Array.isArray(style) ? style : [style]) {
    if (typeof item === 'function') {
      merge(result, item(props));
    } else if (typeof item === 'object') {
      merge(result, item);
    }
  }
  return result;
};

interface StyleProps {
  theme?: Theme;
  kind?: string;
}

export const useThemed = <
  Tag extends keyof JSX.IntrinsicElements,
  ExtraProps = {}
>(
  tag: Tag,
  options: { path: string; style?: Style }
): ForwardRefExoticComponent<
  ComponentPropsWithRef<Tag> & StyleProps & ExtraProps
> => {
  const { path, style: forcedStyle } = options;
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
    const { theme, kind } = props;
    const { kinds, ...componentTheme } = get(theme ?? {}, path ?? '') ?? {};
    const componentKindTheme = kinds?.[kind ?? ''] ?? {};
    const mergedTheme = mergeThemes(
      {},
      theme?.defaults ?? {},
      componentTheme,
      componentKindTheme
    ) as Theme;
    return merge({}, forcedStyle, createStyle(mergedTheme, props));
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
