import { BasicTheme } from '../../models';

export const table: BasicTheme = {
  style: {
    width: '100%',
    borderSpacing: 0,
    fontSize: 3
  },
  components: {
    head: {
      style: {
        background: 'rgba(0, 0, 0, 0.05)',
        userSelect: 'none',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        '& th, & td': {
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
        }
      }
    },
    body: {
      style: {
        '& tr:not(:first-of-type) td': {
          borderTop: '1px solid rgba(0, 0, 0, 0.1)'
        }
      }
    },
    row: {
      style: {
        '&:hover': { background: 'rgba(0, 0, 0, 0.03)' }
      }
    },
    cell: {
      style: {
        padding: 3,
        minWidth: '50px',
        textAlign: 'left',
        '&:last-of-type:not(:first-of-type)': {
          textAlign: 'right'
        }
      },
      kinds: {
        hoverable: {
          style: { cursor: 'pointer' }
        },
        empty: {
          style: {
            color: 'weakText',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.04rem'
          }
        }
      }
    },
    caption: {
      style: {
        paddingX: 3,
        paddingY: 2,
        color: 'white',
        textAlign: 'left',
        fontWeight: 400
      }
    }
  }
};
