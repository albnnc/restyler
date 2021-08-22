import { BasicTheme } from '../../models';

export const pieChart: BasicTheme = {
  style: {
    width: '100%',
    verticalAlign: 'middle'
  },
  components: {
    segment: {
      style: {
        transition: 'opacity 0.2s linear',
        '&:hover': { opacity: 0.8 }
      }
    }
  }
};
