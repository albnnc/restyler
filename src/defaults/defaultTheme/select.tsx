import { ExtendOptions, Theme } from '../../models';
import { mergeThemes } from '../../utils';
import { createInputLikeTheme } from './input';

const markMargin = '1em';

export const select: Theme = {
  ...mergeThemes(
    {},
    createInputLikeTheme({
      canBeDisabled: true,
      canBeFocused: false,
      canBeHovered: true,
      canBeInvalid: true
    }),
    {
      extend: ({ props }) => ({
        position: 'relative',
        width: '100%',
        lineHeight: 'calc(1.5 * 1rem)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        paddingRight: `calc(${markMargin} * 2)`,
        '&:after': {
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
          borderTop: `5px solid ${props.theme.variables?.palette?.text}`
        }
      })
    }
  ),

  option: {
    extend: ({
      props: {
        isActive,
        theme: { variables: { padding = {} } = {} }
      }
    }: ExtendOptions) => ({
      position: 'relative',
      cursor: 'pointer',
      padding: padding.small,
      paddingRight: isActive ? `calc(${markMargin} * 2)` : padding.small,
      '&:hover': { background: 'rgba(0, 0, 0, 0.05)' },
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
        color: 'weakText',
        extend: {
          userSelect: 'none',
          cursor: 'not-allowed'
        }
      }
    }
  },

  selection: {
    extend: ({ createStyle }: ExtendOptions) => ({
      '& + &': createStyle({
        padding: { left: 'small' },
        margin: { left: 'small' },
        border: { left: 'strongBorder' }
      })
    })
  },

  placeholder: {
    color: 'weakText'
  },

  drop: {
    background: 'white',
    radius: 'small',
    elevation: 'medium',
    extend: ({ props: { isVisible } }: ExtendOptions) => ({
      minWidth: '200px',
      maxHeight: '300px',
      overflowY: 'auto',
      opacity: isVisible ? 1 : 0,
      transform: `translateY(${isVisible ? '0' : '-0.5rem'})`,
      transition: 'all 0.2s'
    })
  }
};
