import { ComponentTheme } from '../../models';

export const checkbox: ComponentTheme = {
  checker: {
    margin: { right: 'small' },
    radius: 'x-small',
    background: 'white',

    extend: ({ createStyle, props }) => {
      const createStateStyle = (borderColor, checkerColor, checkerSize) => ({
        ...createStyle({ border: borderColor }),
        position: 'relative',
        display: 'inline-block',
        width: '1rem',
        height: '1rem',
        verticalAlign: 'middle',
        cursor: 'pointer',
        transition: 'all 0.2s',

        // fix vertical alignment
        marginBottom: '3px',

        '&:after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: checkerSize,
          height: checkerSize,
          transition: 'all 0.2s',
          ...createStyle({ redius: 'x-small', background: checkerColor })
        }
      });
      return props.value
        ? createStateStyle('primary', 'primary', '0.5rem')
        : createStateStyle('border-strong', 'white', 0);
    }
  },

  label: {
    extend: { cursor: 'pointer' }
  }
};