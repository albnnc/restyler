import React from 'react';
import isPropValid from '@emotion/is-prop-valid';
import { default as emotionStyled } from '@emotion/styled';
import { Global } from '@emotion/react';
import { Box, isStyleProp, SystemContainer } from 'src';

const styled = (tag: any, fn: any) =>
  emotionStyled(tag, {
    shouldForwardProp: (prop: any) => isPropValid(prop) && !isStyleProp(prop)
  })(fn) as any;

export const systemized = (Story, context) => {
  return (
    <SystemContainer styled={styled}>
      <Global
        styles={{
          'html, body, #root': {
            margin: '0 !important',
            padding: '0 !important',
            minHeight: '100%'
          }
        }}
      />
      <Story {...context} />
    </SystemContainer>
  );
};

export const compact = Story => (
  <div style={{ maxWidth: '500px' }}>
    <Story />
  </div>
);

export const centered = Story => (
  <Box
    direction="row"
    justify="center"
    align="center"
    style={{ minHeight: '100vh' }}
  >
    <Story />
  </Box>
);
