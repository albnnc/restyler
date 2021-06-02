import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { theme } from 'docs/core';
import { createSystem, isStyleProp } from 'lib';

export const system = createSystem({
  theme,
  styled: (tag, fn) =>
    styled(tag, {
      shouldForwardProp: prop => isPropValid(prop) && !isStyleProp(prop)
    })(fn as any) as any
});
