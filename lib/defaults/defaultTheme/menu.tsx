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
            color: isActive ? 'primary' : 'inherit'
          })
        }
      }
    }
  }
};
