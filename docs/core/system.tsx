import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { createSystem, isStyleProp } from 'lib';
import { theme } from './theme';

export const { getRegistry, getTheme, setTheme, useTheme } = createSystem({
  locale: {
    cancelText: 'Cancel',
    confirmText: 'OK'
  },
  theme,
  styled: (tag, fn) =>
    styled(tag, {
      shouldForwardProp: prop => isPropValid(prop) && !isStyleProp(prop)
    })(fn as any) as any
});
