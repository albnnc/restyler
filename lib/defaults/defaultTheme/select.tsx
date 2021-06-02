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
    extend: ({ props, createStyle }: ExtendOptions) =>
      props.isMultiple
        ? {
            ...createStyle({
              background: 'grey',
              padding: { horizontal: 'smaller' },
              radius: 'medium',
              color: 'strongLightText'
            }),
            '& + &': {
              marginLeft: '0.5em'
            }
          }
        : {}
  },

  drop: {
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
    }
  }
};
