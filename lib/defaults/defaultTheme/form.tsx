import { ComponentTheme } from '../../models';

export const form: ComponentTheme = {
  field: {
    direction: 'column',

    label: {
      margin: { bottom: 'small' },
      extend: ({ createStyle, props }) => ({
        ...(props.required
          ? {
              '&:after': {
                content: '" *"',
                ...createStyle({ color: 'danger' })
              }
            }
          : {})
      })
    },

    control: {
      direction: 'row'
    },

    help: {
      color: 'weakText',
      margin: { top: 'smaller' }
    },

    errors: {
      item: {
        color: 'danger',
        margin: { top: 'smaller' }
      }
    }
  },

  row: {
    content: {
      direction: 'row',
      wrap: true,
      extend: ({ props }) => {
        const mediumMargin = props.theme.variables?.margin?.medium ?? 0;
        const mediumMarginHalf = `calc(${mediumMargin} / 2)`;
        const mediumMarginNegativeHalf = `calc(${mediumMargin} / -2)`;
        return {
          margin: mediumMarginNegativeHalf,
          '& > div': {
            flex: '1 0 200px',
            margin: mediumMarginHalf
          }
        };
      }
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
