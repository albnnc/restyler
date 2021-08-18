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
            required ? { '&:after': { content: '" *"', color: 'danger' } } : {}
        },
        control: {
          style: { display: 'flex', marginTop: 2 }
        },
        help: {
          style: { color: 'weakText', marginTop: 1 }
        },
        errors: {
          components: {
            item: {
              style: { color: 'danger', marginTop: 1 }
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
