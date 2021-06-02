import { ComponentTheme } from '../../models';

export const radio: ComponentTheme = {
  option: {
    extend: {
      '& + &': {
        marginTop: '0.2rem'
      }
    },

    checker: {
      margin: { right: 'small' },
      radius: '100vw',
      background: 'white',

      extend: ({ createStyle, props }) => {
        const createStateStyle = (borderColor, checkerColor, checkerSize) => ({
          ...createStyle({ border: { color: borderColor } }),
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
            borderRadius: '100vw',
            transition: 'all 0.2s',
            ...createStyle({ background: checkerColor })
          }
        });
        return props.isActive
          ? createStateStyle('primary', 'primary', '0.5rem')
          : createStateStyle('strongBorder', 'white', 0);
      }
    },

    label: {
      extend: { cursor: 'pointer' }
    }
  },

  group: {}
};
