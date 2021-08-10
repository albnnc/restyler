/** @jsx jsx */
import { jsx, ThemeProvider, useThemeUI } from '@theme-ui/core';
import { Global } from '@emotion/react';
import { forwardRef } from 'react';
import { Box, defaultTheme, SystemContainer } from 'src';

const styled = (Tag: any, fn: any) =>
  forwardRef((props, ref) => {
    const x = useThemeUI();
    console.log(x);
    const { theme, kind, ...rest } = props as any;
    console.log(fn(props));
    return <Tag ref={ref} sx={fn(props)} {...rest} />;
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
