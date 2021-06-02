import { ComponentTheme } from '~lib/models';

export const table: ComponentTheme = {
  extend: {
    width: '100%',
    borderSpacing: 0
  },
  body: {},
  row: {
    extend: {
      '&:hover': { background: 'rgba(0, 0, 0, 0.03)' },
      '&:not(:first-of-type) td': {
        borderTop: '1px solid rgba(0, 0, 0, 0.1)'
      }
    }
  },
  cell: {
    padding: { horizontal: 'medium', vertical: 'small' },
    font: 'medium',
    extend: {
      minWidth: '50px',
      textAlign: 'left',
      '&:last-child:not(:first-of-type)': { textAlign: 'right' }
    },
    kinds: {
      hoverable: { extend: { cursor: 'pointer' } }
    }
  },
  caption: {
    padding: { horizontal: 'medium', vertical: 'small' },
    background: 'grey-dark',
    color: 'white',
    extend: {
      textAlign: 'left',
      fontWeight: 400
    }
  },
  head: {
    background: 'grey-dark',
    color: 'white',
    extend: { userSelect: 'none' }
  }
};
