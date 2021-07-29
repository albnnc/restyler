import { Theme } from '../../models';

export const form: Theme = {
  field: {
    direction: 'column',

    label: {
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
      direction: 'row',
      margin: { top: 'small' }
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

  grid: {
    gap: 'medium',
    extend: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
    }
  }
};
