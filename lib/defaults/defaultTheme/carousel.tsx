import { ComponentTheme } from '~lib';

export const carousel: ComponentTheme = {
  radius: 'small',
  background: 'white',
  padding: 'medium',
  extend: {
    overflow: 'hidden',
    position: 'relative'
  },
  item: {
    extend: ({ props }) => {
      return {
        transform: `translateX(0)`,
        transition: 'all 0.7s',

        '&[data-transition="enter"]': {
          transform: `translateX(${
            props.enterDirection === 'left' ? '-150' : '150'
          }%)`
        },

        '&[data-transition="leave"]': {
          position: 'absolute',
          transform: `translateX(${
            props.enterDirection === 'left' ? '150' : '-150'
          }%)`
        }
      };
    }
  }
};
