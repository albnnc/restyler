import React from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import { blueprintTheme } from './blueprintTheme';
import {
  defaultTheme,
  Box,
  SystemContext,
  createSystem,
  isStyleProp
} from 'src';

const storySystemDefaults = {
  theme: defaultTheme,
  styled: (tag: any, fn: any) =>
    styled(tag, {
      shouldForwardProp: (prop: any) => isPropValid(prop) && !isStyleProp(prop)
    })(fn) as any
};
const system = createSystem(storySystemDefaults);
const blueprintSystem = createSystem({
  ...storySystemDefaults,
  theme: blueprintTheme
});

export const systemized = (Story, context) => {
  return (
    <SystemContext.Provider value={system}>
      <Global
        styles={{
          '*': { boxSizing: 'border-box' },
          'html, body, #root': {
            margin: '0 !important',
            padding: '0 !important',
            lineHeight: 1.5,
            minHeight: '100%',
            color: system.theme.variables?.palette?.text
          }
        }}
      />
      <Story {...context} />
    </SystemContext.Provider>
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

export const blueprinted = Story => (
  <SystemContext.Provider value={blueprintSystem}>
    <Story />
  </SystemContext.Provider>
);
