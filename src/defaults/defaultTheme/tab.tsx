import { BasicTheme } from '../..';

export const tab: BasicTheme = {
  components: {
    group: {
      style: { display: 'flex' }
    },
    option: {
      style: ({ isActive }) => ({
        paddingY: 2,
        paddingX: 3,
        borderBottom: '2px solid transparent',
        fontSize: 2,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'text',
        cursor: 'pointer',
        '&:hover': { color: 'primary' },
        ...(isActive ? { color: 'primary', borderBottomColor: 'primary' } : {})
      })
    }
  }
};
