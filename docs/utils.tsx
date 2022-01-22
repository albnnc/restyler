/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { ReactNode, useContext } from 'react';
import { Box, get, SystemContext } from 'lib';

export const delay = (t: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined);
    }, t);
  });

export const createBlueprint = (
  id: string,
  options: { exclude?: RegExp; muted?: RegExp } = {}
) =>
  Object.assign(
    () => {
      const { theme } = useContext(SystemContext);
      const getBlueprint = (id = ''): ReactNode => {
        const current = id.split('.').pop();
        if (
          ['style', 'kinds', 'components'].includes(current ?? '') ||
          (options.exclude && options.exclude.test(id))
        ) {
          return null;
        }
        const isMuted = options.muted && options.muted.test(id);
        const target =
          get(theme, 'components.' + id.split('.').join('.components.')) ?? {};
        return (
          <Box
            key={id}
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
                content: `"${id}"`,
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
            {Object.keys(target.components ?? {}).map(v =>
              getBlueprint(id ? `${id}.${v}` : v)
            )}
          </Box>
        );
      };
      return getBlueprint(id);
    },
    {
      parameters: { backgrounds: { default: 'white' } }
    }
  );
