import { ComponentTheme } from '../../models';

export const form: ComponentTheme = {
  field: {
    direction: 'column',

    label: {
      margin: { bottom: 'small' },
      extend: ({ createStyle, props }) => ({
        ...(props.required
          ? {
              ':after': {
                content: '" *"',
                ...createStyle({ color: 'danger' })
              }
            }
          : {})
      })
    },

    errors: {
      item: {
        color: 'danger',
        margin: { top: 'x-small' }
      }
    }
  },

  row: {
    direction: 'row',
    wrap: true,
    extend: ({ props }) => {
      const mediumMargin = props.theme.variables?.margin?.medium ?? 0;
      const mediumMarginHalf = `calc(${mediumMargin} / 2)`;
      const mediumMarginHalfNegative = `calc(${mediumMargin} / -2)`;
      return {
        margin: mediumMarginHalfNegative,
        '& > *': {
          flexBasis: '200px',
          flexShrink: 0,
          flexGrow: 1,
          margin: mediumMarginHalf
        }
      };
    }
  },

  kinds: {
    vertical: {
      extend: ({ createStyle }) => ({
        '& > *:not(:first-child)': createStyle({
          margin: { top: 'medium' }
        })
      })
    }
  }
};
