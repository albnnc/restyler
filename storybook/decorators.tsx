/** @jsx jsx */
import { jsx, ThemeProvider } from '@theme-ui/core';
import { Global } from '@emotion/react';
import { forwardRef } from 'react';
import isPropValid from '@emotion/is-prop-valid';
import { Box, defaultTheme, SystemContainer } from 'src';

const styled = (Tag: any, fn: any) =>
  forwardRef((props, ref) => {
    const { theme, kind, ...rest } = props as any;
    const validProps = Object.keys(rest).reduce(
      (p, k) => (isPropValid(k) ? { ...p, [k]: rest[k] } : p),
      {}
    );
    return <Tag ref={ref} sx={fn(props)} {...validProps} />;
  }) as any;

export const systemized = (Story, context) => {
  return (
    <ThemeProvider theme={defaultTheme as any}>
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
    </ThemeProvider>
  );
};

export const centered = Story => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}
  >
    <Story />
  </Box>
);
