import { Theme, StyleProps } from '../../models';

const createBasicKind = (color: string, additionalProps?: StyleProps) => ({
  padding: { vertical: 'smaller', horizontal: 'medium' },
  radius: 'small',
  background: 'transparent',
  color: 'strongText',
  border: { width: '1px', color: 'border' },
  font: 'small',
  extend: [
    ({ createStyle, props }) => ({
      cursor: 'pointer',
      textTransform: 'uppercase',
      letterSpacing: '0.04rem',
      transition: 'all 0.15s',
      ...(props.disabled
        ? createStyle({
            color: 'weakText',
            border: { color: 'border', style: 'dashed' }
          })
        : { '&:hover': createStyle({ color, border: color }) })
    }),
    ({ createStyle }) => createStyle(additionalProps ?? {})
  ]
});

const createArrowKind = direction => ({
  extend: {
    background: 'transparent',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    font: 'inherit',
    outline: 'none',
    padding: 0,
    display: 'inline-block',
    verticalAlign: 'middle',
    '&::after': {
      display: 'block',
      content: '""',
      width: 0,
      height: 0,
      ...{
        up: {
          borderBottom: '5px solid currentColor',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent'
        },
        down: {
          borderTop: '5px solid currentColor',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent'
        },
        left: {
          borderRight: '5px solid currentColor',
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent'
        },
        right: {
          borderLeft: '5px solid currentColor',
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent'
        }
      }[direction]
    }
  }
});

export const button: Theme = {
  kinds: {
    primary: createBasicKind('primary'),
    secondary: createBasicKind('primary', {
      border: { color: 'border', style: 'dashed' }
    }),
    success: createBasicKind('success'),
    warning: createBasicKind('warning'),
    danger: createBasicKind('danger'),
    arrowUp: createArrowKind('up'),
    arrowDown: createArrowKind('down'),
    arrowLeft: createArrowKind('left'),
    arrowRight: createArrowKind('right')
  }
};
