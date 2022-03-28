import { BasicTheme } from '../../models';

const markMargin = '1em';

export const autocomplete: BasicTheme = {
  components: {
    option: {
      style: ({ isActive, isSelected }) => ({
        position: 'relative',
        cursor: 'pointer',
        padding: 2,
        paddingRight: isActive ? `calc(${markMargin} * 2)` : 2,
        backgroundColor: isSelected ? 'accentSurface' : 'transparent',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
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
    }
  }
};
