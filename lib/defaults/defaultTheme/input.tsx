import { ComponentTheme } from '~lib/models';

export const input: ComponentTheme = {
  padding: 'small',
  radius: 'small',
  extend: ({ createStyle, props }) => {
    const createBorderStyle = (color, focusColor) => ({
      width: '100%',
      transition: 'all 0.2s',
      ...createStyle({ border: color }),
      '&:focus': {
        ...createStyle({ border: focusColor }),
        boxShadow: `inset 0 0 0 1px ${
          props.theme.variables?.palette?.[focusColor] ?? focusColor
        }`
      },
      '&:disabled': createStyle({
        border: { width: '1px', color, style: 'dashed' }
      })
    });
    return props.invalid
      ? createBorderStyle('danger', 'danger')
      : createBorderStyle('rgba(0, 0, 0, 0.2)', 'primary');
  }
};
