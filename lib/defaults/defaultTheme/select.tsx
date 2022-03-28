import { BasicTheme } from '../../models';
import { mergeBasicThemes } from '../../utils';
import { createInputLikeTheme } from './input';

const markMargin = '1em';

export const select: BasicTheme = {
  ...mergeBasicThemes(
    {},
    createInputLikeTheme({
      canBeDisabled: true,
      canBeFocused: false,
      canBeHovered: true,
      canBeInvalid: true
    }),
    {
      style: {
        position: 'relative',
        width: '100%',
        lineHeight: 'calc(1.5 * 1rem)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        paddingRight: `calc(${markMargin} * 2)`,
        '&::after': {
          display: 'block',
          content: '""',
          position: 'absolute',
          right: markMargin,
          top: '50%',
          transform: 'translate(50%, -50%)',
          width: 0,
          height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: `5px solid`,
          borderTopColor: 'currentColor'
        }
      }
    }
  ),

  components: {
    option: {
      style: ({ isActive }) => ({
        position: 'relative',
        cursor: 'pointer',
        padding: 2,
        paddingRight: isActive ? `calc(${markMargin} * 2)` : 2,
        '&:hover': {
          backgroundColor: 'accentSurface'
        },
        '&::after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          width: '0.3em',
          height: '0.3em',
          borderRadius: '100vw',
          top: '50%',
          right: isActive ? markMargin : `calc(${markMargin} / 2)`,
          transform: 'translate(50%, -50%)',
          transition: 'all 0.15s',
          background: isActive ? 'currentColor' : 'transparent'
        }
      }),
      kinds: {
        empty: {
          style: {
            opacity: 0.7,
            userSelect: 'none',
            cursor: 'not-allowed',
            '&::after': { display: 'none' }
          }
        }
      }
    },

    selection: {
      style: {
        '& + &': {
          pl: 2,
          ml: 2,
          borderLeft: '1px solid',
          borderLeftColor: 'border'
        }
      }
    },

    placeholder: {
      style: {
        opacity: 0.7
      }
    }
  }
};
