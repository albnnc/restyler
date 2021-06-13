import React, { ReactNode, useEffect, useState } from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import { blueprintTheme } from './blueprintTheme';
import {
  defaultTheme,
  Box,
  SystemContext,
  createSystem,
  isStyleProp,
  System,
  useImperativePortal
} from 'src';

const defaultSystem = createSystem({
  theme: defaultTheme,
  styled: (tag: any, fn: any) =>
    styled(tag, {
      shouldForwardProp: (prop: any) => isPropValid(prop) && !isStyleProp(prop)
    })(fn) as any
});

const blueprintSystem = createSystem({
  ...defaultSystem,
  theme: blueprintTheme
});

const SystemContainer = (props: { children: ReactNode; system: System }) => {
  const [system, setSystem] = useState(props.system);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const portal = useImperativePortal(mountNode);
  useEffect(() => {
    const { defaults, ...rest } = props.system;
    if (!portal) {
      return;
    }
    setSystem({
      defaults: {
        ...defaults,
        standaloneTransitionOptions: { portal }
      },
      ...rest
    });
  }, [portal]);
  return (
    <SystemContext.Provider value={system}>
      <div ref={setMountNode} />
      {portal}
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
      {props.children}
    </SystemContext.Provider>
  );
};

export const systemized = (Story, context) => {
  return (
    <SystemContainer system={defaultSystem}>
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

export const blueprinted = Story => {
  return (
    <SystemContext.Provider value={blueprintSystem}>
      <Story />
    </SystemContext.Provider>
  );
};
