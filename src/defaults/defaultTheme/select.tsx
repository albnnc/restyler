import { ExtendOptions, Theme } from '../../models';
import { mergeThemes } from '../../utils';
import { createInputLikeTheme } from './input';

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
        lineHeight: 'calc(1.5 * 1rem)',
        width: '100%',
        position: 'relative',
        '&:after': {
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
      })
    }
  ),

  option: {
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
