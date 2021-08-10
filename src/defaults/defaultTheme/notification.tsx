import { Theme } from '../../models';

export const notification: Theme = {
  style: ({ isVisible, isEntering }) => {
    return {
      margin: 3,
      padding: 3,
      borderRadius: 2,
      width: '400px',
      maxWidth: '80vw',
      boxShadow: 3,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      color: 'white',
      transition: [
        'opacity 0.2s linear',
        'transform 0.2s linear',
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
    primary: {
      style: {
        borderLeft: '4px solid',
        borderLeftColor: 'primary'
      }
    },
    success: {
      style: {
        borderLeft: '4px solid',
        borderLeftColor: 'success'
      }
    },
    warning: {
      style: {
        borderLeft: '4px solid',
        borderLeftColor: 'warning'
      }
    },
    danger: {
      style: {
        borderLeft: '4px solid',
        borderLeftColor: 'danger'
      }
    }
  }
};
