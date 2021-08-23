import { BasicTheme } from '../../models';

const titleStyle = {
  userSelect: 'none',
  cursor: 'pointer',
  '&:hover': { color: 'primary' }
};

export const menu: BasicTheme = {
  components: {
    group: {
      style: {
        '&:not(:first-of-type)': { marginTop: '1' }
      },
      components: {
        title: { style: titleStyle },
        items: { style: { paddingTop: 1, paddingLeft: 4 } }
      }
    },
    item: {
      style: {
        '&:not(:first-of-type)': { marginTop: 1 }
      },
      components: {
        title: {
          style: ({ isActive }) => ({
            ...titleStyle,
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              position: 'absolute',
              width: '0.3em',
              height: '0.3em',
              borderRadius: '100vw',
              top: '50%',
              right: isActive ? '0.5em' : 0,
              transform: 'translateY(-50%)',
              transition: 'all 0.15s',
              background: isActive ? 'currentColor' : 'transparent'
            }
          })
        }
      }
    }
  }
};
