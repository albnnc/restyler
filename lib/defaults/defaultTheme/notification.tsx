import { ComponentTheme } from '../../models';

export const notification: ComponentTheme = {
  radius: 'small',
  elevation: 'x-large',
  background: 'rgba(0, 0, 0, 0.85)',
  padding: 'medium',
  color: 'white',
  margin: 'medium',
  extend: ({ props }) => {
    return {
      width: '400px',
      transition:
        'opacity 0.2s, transform 0.2s, top 0.3s ease, bottom 0.3s ease',
      opacity: 1,
      transform: 'translate(0)',

      '&[data-transition="enter"]': {
        opacity: 0,
        transform: 'translate(0.7rem)'
      },

      '&[data-transition="leave"]': {
        opacity: 0,
        transform: 'translate(-0.7rem)'
      }
    };
  },
  kinds: {
    primary: { border: { left: { width: '4px', color: 'primary' } } },
    success: { border: { left: { width: '4px', color: 'success' } } },
    warning: { border: { left: { width: '4px', color: 'warning' } } },
    danger: { border: { left: { width: '4px', color: 'danger' } } }
  }
};
