import { Theme } from '../../models';

export const table: Theme = {
  font: 'medium',
  extend: {
    width: '100%',
    borderSpacing: 0
  },

  head: {
    background: 'rgba(0, 0, 0, 0.05)',
    extend: {
      userSelect: 'none',
      textTransform: 'uppercase',
      letterSpacing: '0.04rem'
    }
  },

  body: {
    extend: {
      '& td': {
        borderTop: '1px solid rgba(0, 0, 0, 0.1)'
      },
      '&:first-child tr:first-child td': {
        borderTop: 'none'
      }
    }
  },

  row: {
    extend: {
      '&:hover': { background: 'rgba(0, 0, 0, 0.03)' }
    }
  },

  cell: {
    padding: 'medium',
    extend: {
      minWidth: '50px',
      textAlign: 'left',
      '&:last-of-type:not(:first-of-type)': {
        textAlign: 'right'
      }
    },
    kinds: {
      hoverable: { extend: { cursor: 'pointer' } },
      empty: {
        color: 'weakText',
        extend: {
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.04rem'
        }
      }
    }
  },

  caption: {
    padding: { horizontal: 'medium', vertical: 'small' },
    color: 'white',
    extend: {
      textAlign: 'left',
      fontWeight: 400
    }
  }
};
