import { ComponentTheme } from '../..';

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
        opacity: 1,
        transform: `translateX(0)`,
        transition: 'opacity 0.5s, transform 0.7s',

        '&[data-transition="enter"]': {
          opacity: 0,
          transform: `translateX(${
            props.enterDirection === 'left' ? '-150' : '150'
          }%)`
        },

        '&[data-transition="leave"]': {
          position: 'absolute',
          opacity: 0,
          transform: `translateX(${
            props.enterDirection === 'left' ? '150' : '-150'
          }%)`
        }
      };
    }
  }
};
