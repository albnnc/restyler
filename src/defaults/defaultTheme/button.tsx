import { BasicTheme } from '../../models';

const createBasicKind = (color: string, extras?: any): BasicTheme => ({
  style: props => ({
    paddingX: 3,
    paddingY: 2,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'border',
    backgroundColor: 'transparent',
    color: 'strongText',
    fontSize: 2,
    fontFamily: 'body',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.04rem',
    outline: 'none',
    transition: 'all 0.15s',
    ...(props.disabled
      ? {
          color: 'weakText',
          borderStyle: 'dashed'
        }
      : { '&:hover, &:focus': { color, borderColor: color } }),
    ...extras
  })
});

export const button: BasicTheme = {
  kinds: {
    primary: createBasicKind('primary'),
    secondary: createBasicKind('primary', { borderStyle: 'dashed' }),
    success: createBasicKind('success'),
    warning: createBasicKind('warning'),
    danger: createBasicKind('danger')
  }
};
