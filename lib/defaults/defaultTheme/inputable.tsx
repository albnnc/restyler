import { BasicTheme } from '../../models';
import { mergeBasicThemes } from '../../utils';
import { createInputLikeTheme } from './input';

export const inputable: BasicTheme = {
  ...mergeBasicThemes(
    {},
    createInputLikeTheme({
      canBeDisabled: true,
      canBeFocused: true,
      canBeHovered: false,
      canBeInvalid: true
    }),
    {
      style: {
        cursor: 'text',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2
      }
    }
  ),
  components: {
    input: {
      style: {
        '&, &:focus, &:disabled': {
          flex: '1 0 50px',
          minWidth: 0,
          margin: 0,
          padding: 0,
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          color: 'inherit'
        }
      }
    },
    chip: {
      style: {
        flex: '0 0 auto',
        paddingX: 2,
        paddingY: 0,
        verticalAlign: 'middle',
        display: 'inline-block',
        borderRadius: 2,
        backgroundColor: 'primary',
        color: 'onPrimary',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'accentPrimary'
        }
      },
      kinds: {
        removable: {
          style: {
            '&::after': {
              content: '"\\00d7"',
              fontSize: 3,
              marginLeft: 1
            }
          }
        }
      }
    }
  }
};
