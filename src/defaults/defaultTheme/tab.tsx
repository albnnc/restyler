import { Theme } from '../..';

export const tab: Theme = {
  group: {
    style: { display: 'flex' }
  },
  option: {
    style: ({ isActive }) => ({
      paddingY: 2,
      paddingX: 3,
      borderBottom: '2px solid transparent',
      color: 'text',
      cursor: 'pointer',
      transition: 'all 0.2s',
      textTransform: 'uppercase',
      letterSpacing: '0.04rem',
      '&:hover': { color: 'primary' },
      ...(isActive ? { color: 'primary', borderBottomColor: 'primary' } : {})
    })
  }
};
