import { ComponentTheme } from '../..';

export const tab: ComponentTheme = {
  group: {
    direction: 'row'
  },

  option: {
    padding: {
      vertical: 'small',
      horizontal: 'medium'
    },
    border: {
      bottom: { width: '2px', color: 'transparent' }
    },
    color: 'text',

    extend: ({ createStyle, props }) => ({
      cursor: 'pointer',
      transition: 'all 0.2s',
      textTransform: 'uppercase',
      letterSpacing: '0.04rem',

      '&:hover': createStyle({
        color: 'primary'
      }),

      ...(props.isActive
        ? createStyle({
            color: 'primary',
            border: {
              bottom: { width: '2px', color: 'primary' }
            }
          })
        : {})
    })
  }
};
