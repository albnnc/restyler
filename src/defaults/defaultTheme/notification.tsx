import { Theme } from '../../models';

export const notification: Theme = {
  radius: 'small',
  elevation: 'larger',
  background: 'rgba(0, 0, 0, 0.85)',
  padding: 'medium',
  color: 'white',
  margin: 'medium',
  extend: ({ props: { isVisible, isEntering } }) => {
    return {
      width: '400px',
      transition: [
        'opacity 0.2s',
        'transform 0.2s',
        'top 0.3s ease',
        'bottom 0.3s ease'
      ].join(', '),
      opacity: isVisible ? 1 : 0,
      transform: `translateY(${
        isVisible ? '0' : isEntering ? '0.7rem' : '-0.7rem'
      })`
    };
  },
  kinds: {
    primary: { border: { left: { width: '4px', color: 'primary' } } },
    success: { border: { left: { width: '4px', color: 'success' } } },
    warning: { border: { left: { width: '4px', color: 'warning' } } },
    danger: { border: { left: { width: '4px', color: 'danger' } } }
  }
};
