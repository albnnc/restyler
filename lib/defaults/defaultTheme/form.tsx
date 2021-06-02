import { ComponentTheme } from '~lib/models';

export const form: ComponentTheme = {
  field: {
    direction: 'column',

    extend: ({ createStyle }) => ({
      '& + &': createStyle({
        margin: { top: 'medium' }
      })
    }),

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
  }
};
