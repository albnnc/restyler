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
        backgroundColor: 'accentSurface',
        userSelect: 'none',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        '& th, & td': {
          borderBottom: '1px solid',
          borderBottomColor: 'border'
        }
      }
    },
    body: {
      style: {
        '& tr:not(:first-of-type) td': {
          borderTop: '1px solid',
          borderTopColor: 'border'
        }
      }
    },
    row: {
      style: {
        '&:hover': { backgroundColor: 'accentSurface' }
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
            color: 'muted',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }
        }
      }
    },
    caption: {
      style: {
        paddingX: 3,
        paddingY: 2,
        color: 'onSurface',
        backgroundColor: 'accentSurface',
        textAlign: 'left',
        fontWeight: 400
      }
    }
  }
};
