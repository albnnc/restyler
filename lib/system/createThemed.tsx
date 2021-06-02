import React, { forwardRef } from 'react';
import { Styled, Themed } from '~lib/models';
import { filterStyleProps, get, merge, mergeStyleProps } from '~lib/utils';
import { createStyle } from './createStyle';

export const createThemed = (styled: Styled, useTheme) => {
  const themed: Themed = <
    Tag extends keyof JSX.IntrinsicElements,
    ExtraProps = {}
  >(
    tag,
    options
  ) => {
    const { path, style } = options;
    const ThemedComponent = styled(tag, props => {
      const { styleProps, ...rest } = filterStyleProps(props);
      const defaultStyleProps = styleProps.theme?.defaults ?? {};
      const themeStyleProps = get(styleProps.theme, path ?? '') ?? {};
      const kindStyleProps = themeStyleProps.kinds?.[styleProps.kind] ?? {};
      const mergedStyleProps = mergeStyleProps(
        {},
        defaultStyleProps,
        themeStyleProps,
        kindStyleProps,
        styleProps
      );
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
    const Observer = forwardRef<any>((props, ref) => {
      const theme = useTheme();
      return <ThemedComponent ref={ref} theme={theme} {...props} />;
    });

    // TODO: remove `any`
    return Observer as any;
  };

  return themed;
};
