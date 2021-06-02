import { ComponentTheme } from '../..';

export const tab: ComponentTheme = {
  group: {
    direction: 'row'
  },

  option: {
    padding: {
      vertical: 'x-small',
      horizontal: 'medium'
    },
    border: {
      bottom: { width: '2px', color: 'transparent' }
    },
    color: 'text',

    extend: ({ createStyle, props }) => ({
      cursor: 'pointer',
      transition: 'all 0.2s',

      '&:not(:first-of-type)': createStyle({
        margin: { left: 'medium' }
      }),

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
