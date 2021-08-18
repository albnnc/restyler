import React, {
  forwardRef,
  useContext,
  ComponentPropsWithRef,
  ForwardRefExoticComponent
} from 'react';
import { SystemContext } from '../components';
import { ThemeProps } from '../models';
import { capitalizeFirst } from '../utils';

export interface ThemedOptions {
  key: string;
  getStyle?: <Props extends ThemeProps>(props: Props, key: string) => any;
}

export const useThemed = <
  Tag extends keyof JSX.IntrinsicElements,
  ExtraProps = {}
>(
  tag: Tag,
  options: ThemedOptions
): ForwardRefExoticComponent<
  ComponentPropsWithRef<Tag> & ThemeProps & ExtraProps
> => {
  const { defaults, registry, styled } = useContext(SystemContext);
  const { key = 'unknown', getStyle } = {
    ...defaults?.themedOptions,
    ...options
  };

  const token = `${tag}:${key}`;
  if (registry[token]) {
    return registry[token];
  }

  const displayName = key
    .split('.')
    .map(v => capitalizeFirst(v))
    .join('');

  const StyledComponent = styled<Tag, ThemeProps & ExtraProps>(
    tag as Tag,
    props => getStyle?.(props, key)
  );
  StyledComponent.displayName = 'Styled' + displayName;

  const ThemedComponent = forwardRef<any, any>((props, ref) => {
    const { theme } = useContext(SystemContext);
    return <StyledComponent ref={ref} theme={theme} {...props} />;
  });
  ThemedComponent.displayName = 'Themed' + displayName;

  registry[token] = ThemedComponent;

  return registry[token];
};
