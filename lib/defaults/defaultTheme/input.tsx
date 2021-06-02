import { ComponentTheme } from '../../models';

export const input: ComponentTheme = {
  padding: 'small',
  radius: 'small',
  extend: ({ createStyle, props }) => {
    const createBorderStyle = (color, focusColor) => ({
      width: '100%',
      transition: ['border 0.2s', 'box-shadow 0.2s'].join(', '),
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
      : createBorderStyle('border', 'primary');
  }
};
