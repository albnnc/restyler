import { ComponentTheme } from '../../models';
import { mergeStyleProps } from '../../utils';
import { input } from './input';

export const select: ComponentTheme = {
  extend: ({ props }) => ({
    width: '100%',
    position: 'relative',
    ':after': {
      display: 'block',
      content: '""',
      position: 'absolute',
      right: '0.7rem',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 0,
      height: 0,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: `5px solid ${props.theme.variables?.palette?.['text']}`
    }
  }),

  input: mergeStyleProps({}, input, {
    extend: {
      cursor: 'pointer',
      paddingRight: 'calc(1.4rem + 5px)'
    }
  }),

  options: {
    background: 'white',
    radius: 'small',
    elevation: 'medium',

    extend: {
      minWidth: '200px',
      maxHeight: '300px',
      overflowY: 'auto',

      opacity: 1,
      transform: 'translateY(0)',
      transition: 'all 0.2s',

      '&[data-transition]': {
        opacity: 0,
        transform: 'translateY(-0.5rem)'
      }
    },

    item: {
      padding: 'small',
      extend: ({ props }) => ({
        cursor: 'pointer',
        '&:hover': { background: 'rgba(0, 0, 0, 0.05)' },
        ...(props.isActive
          ? {
              background: 'rgba(0, 0, 0, 0.05)',
              '&:hover': { background: 'rgba(0, 0, 0, 0.1)' }
            }
          : {})
      })
    }
  }
};
