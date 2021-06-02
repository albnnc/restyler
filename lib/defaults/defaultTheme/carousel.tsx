import { mergeThemes } from 'lib/utils/mergeThemes';
import { Theme } from '../../models';
import { button } from './button';

export const carousel: Theme = {
  background: 'white',
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
  },

  leftArrow: mergeThemes({}, button, button.kinds?.arrowLeft ?? {}, {
    extend: {
      zIndex: 1,
      position: 'absolute',
      top: '50%',
      width: '2rem',
      height: '2rem',
      transform: 'translateY(-50%)',
      padding: '0.7rem',
      background: 'rgba(255, 255, 255, 0.3)',
      opacity: 0.7,
      transition: 'opacity 0.2s',
      borderRadius: '100vw',
      '&:hover': { opacity: 0.9 },
      '&:first-of-type': { left: '1rem' },
      '&:last-of-type': { right: '1rem' }
    }
  })
};
