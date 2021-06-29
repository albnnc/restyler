import { defaultTheme, knownStyleProps, Theme } from 'src';

const transform = (theme: Theme, path = '') => {
  const key = path.split('.').pop();
  if ([...knownStyleProps, 'extend', 'defaults'].includes(key ?? '')) {
    return undefined;
  }
  if (key === 'variables') {
    return theme[key];
  }
  const target = key ? theme[key] : theme;
  return {
    ...Object.keys(target).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: transform(target, path ? `${path}.${curr}` : curr)
      }),
      {}
    ),
    background: 'rgba(123, 176, 255, 0.5)',
    border: 'rgba(14, 75, 167, 0.6)',
    padding: { horizontal: '10px', bottom: '10px', top: '30px' },
    direction: 'column',
    extend: {
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
    }
  };
};

export const blueprintTheme = transform(defaultTheme);
