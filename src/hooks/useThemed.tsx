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
  id: string;
  getStyle?: <Props extends ThemeProps>(props: Props, key: string) => any;
}

export const useThemed = <
  Tag extends keyof JSX.IntrinsicElements,
  ExtraProps extends {} = {}
>(
  tag: Tag,
  options: ThemedOptions
): ForwardRefExoticComponent<
  ComponentPropsWithRef<Tag> & ThemeProps & ExtraProps
> => {
  const { defaults, registry, styled } = useContext(SystemContext);
  const { id = 'unknown', getStyle } = {
    ...defaults?.themedOptions,
    ...options
  };

  const token = `${tag}:${id}`;
  if (registry[token]) {
    return registry[token];
  }

  const displayName = id
    .split('.')
    .map(v => capitalizeFirst(v))
    .join('');

  const StyledComponent = styled<Tag, ThemeProps & ExtraProps>(
    tag as Tag,
    props => getStyle?.(props, id)
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

export const useThemedFactory =
  <DefaultExtraProps extends {}>(defaults?: Partial<ThemedOptions>) =>
  <Tag extends keyof JSX.IntrinsicElements, ExtraProps = DefaultExtraProps>(
    tag: Tag,
    options: ThemedOptions
  ) =>
    useThemed<Tag, ExtraProps>(tag, { ...defaults, ...options });
