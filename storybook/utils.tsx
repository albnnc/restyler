/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactNode, useContext } from 'react';
import { Box, get, knownStyleProps, SystemContext, Theme } from 'src';

export const delay = (t: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined);
    }, t);
  });

export const createBlueprint = (
  path: string,
  options: { exclude?: RegExp } = {}
) =>
  Object.assign(
    () => {
      const system = useContext(SystemContext);
      const getBlueprint = (theme: Theme, path = ''): ReactNode => {
        const key = path.split('.').pop();
        if (
          [
            ...knownStyleProps,
            'variables',
            'extend',
            'defaults',
            'kinds'
          ].includes(key ?? '') ||
          (options.exclude && options.exclude.test(path))
        ) {
          return null;
        }
        const target = key ? theme[key] : theme;
        return (
          <Box
            key={path}
            background="rgba(123, 176, 255, 0.5)"
            border="rgba(14, 75, 167, 0.6)"
            padding={{ horizontal: '10px', bottom: '10px', top: '30px' }}
            direction="column"
            css={{
              gap: '10px',
              position: 'relative',
              boxSizing: 'border-box',
              minWidth: '300px',
              minHeight: '50px',
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
                color: 'rgba(10, 44, 95, 0.781)'
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
        ? get(system.theme, path.split('.').slice(0, -1).join('.'))
        : system.theme;
      return getBlueprint(base, path);
    },
    {
      parameters: { backgrounds: { default: 'white' } }
    }
  );
