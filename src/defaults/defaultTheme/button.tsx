import { BasicTheme } from '../../models';

const createKind = (color: string, extras?: any): BasicTheme => ({
  style: props => ({
    paddingX: 3,
    paddingY: 2,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'border',
    backgroundColor: 'transparent',
    fontSize: 2,
    fontFamily: 'body',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    outline: 'none',
    transition: 'all 0.15s',
    ...(props.disabled
      ? {
          color: 'border',
          borderStyle: 'dashed',
          pointerEvents: 'none'
        }
      : {
          color: 'inherit',
          '&:hover, &:focus': {
            color,
            borderColor: color
          }
        }),
    ...extras
  })
});

export const button: BasicTheme = {
  kinds: {
    primary: createKind('primary'),
    secondary: createKind('primary', { borderStyle: 'dashed' }),
    success: createKind('success'),
    warning: createKind('warning'),
    danger: createKind('danger')
  }
};
