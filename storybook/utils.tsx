/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { ReactNode, useContext } from 'react';
import { Box, get, SystemContext, Theme } from 'src';

export const delay = (t: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined);
    }, t);
  });

export const createBlueprint = (
  path: string,
  options: { exclude?: RegExp; muted?: RegExp } = {}
) =>
  Object.assign(
    () => {
      const system = useContext(SystemContext);
      const getBlueprint = (theme: Theme, path = ''): ReactNode => {
        const key = path.split('.').pop();
        if (
          ['defaults', 'kinds', 'style'].includes(key ?? '') ||
          (options.exclude && options.exclude.test(path))
        ) {
          return null;
        }
        const isMuted = options.muted && options.muted.test(path);
        const target = key ? theme[key] : theme;
        return (
          <Box
            key={path}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              margin: '0 auto',
              padding: '10px',
              paddingTop: '30px',
              width: '100%',
              maxWidth: '400px',
              minHeight: '50px',
              border: isMuted
                ? '1px solid rgba(0, 0, 0, 0.3)'
                : '1px solid rgba(14, 75, 167, 0.6)',
              backgroundColor: isMuted
                ? 'rgba(0, 0, 0, 0.05)'
                : 'rgba(123, 176, 255, 0.5)',
              position: 'relative',
              boxSizing: 'border-box',
              fontSize: 0,
              '&::-webkit-file-upload-button': {
                visibility: 'hidden'
              },
              '&::before': {
                content: `"${path}"`,
                display: 'block',
                position: 'absolute',
                top: '2px',
                left: '5px',
                fontSize: '14px',
                fontFamily: 'monospace',
                color: isMuted
                  ? 'rgba(0, 0, 0, 0.8)'
                  : 'rgba(10, 44, 95, 0.781)'
              }
            }}
          >
            {Object.keys(target).map(v =>
              getBlueprint(target, path ? `${path}.${v}` : v)
            )}
          </Box>
        );
      };
      const base = path.includes('.')
        ? get(system.theme.components, path.split('.').slice(0, -1).join('.'))
        : system.theme.components;
      return getBlueprint(base, path);
    },
    {
      parameters: { backgrounds: { default: 'white' } }
    }
  );
