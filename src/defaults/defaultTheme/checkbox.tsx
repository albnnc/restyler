import { Theme } from '../../models';

export const checkbox: Theme = {
  style: { cursor: 'pointer' },
  checker: {
    style: ({ value }) => {
      const createStateStyle = (borderColor, checkerColor, checkerSize) => ({
        marginRight: 2,
        borderRadius: 1,
        background: 'white',
        border: '1px solid',
        borderColor,
        position: 'relative',
        display: 'inline-block',
        width: '1rem',
        height: '1rem',
        verticalAlign: 'middle',
        cursor: 'pointer',
        transition: 'all 0.2s',

        // Fixing vertical alignment.
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
          radius: 1,
          backgroundColor: checkerColor
        }
      });
      return value
        ? createStateStyle('primary', 'primary', '0.5rem')
        : createStateStyle('strongBorder', 'white', 0);
    }
  },
  label: {}
};
