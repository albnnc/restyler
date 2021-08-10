import { Theme } from '../../models';

export const form: Theme = {
  field: {
    style: {
      display: 'flex',
      flexDirection: 'column'
    },

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
      item: {
        style: { color: 'danger', marginTop: 1 }
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
};
