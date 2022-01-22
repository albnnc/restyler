import { BasicTheme } from '../../models';

export const form: BasicTheme = {
  components: {
    field: {
      style: {
        display: 'flex',
        flexDirection: 'column'
      },
      components: {
        label: {
          style: ({ required }) =>
            required
              ? {
                  '&:after': {
                    content: '" *"',
                    color: 'danger'
                  }
                }
              : {}
        },
        control: {
          style: { marginTop: 2 }
        },
        help: {
          style: { marginTop: 1, opacity: 0.7 }
        },
        errors: {
          components: {
            item: {
              style: { marginTop: 1, color: 'danger' }
            }
          }
        }
      }
    },
    grid: {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 3
      }
    }
  }
};
