import { BasicTheme } from '../../models';

export const pieChart: BasicTheme = {
  style: {
    width: '100%',
    verticalAlign: 'middle'
  },
  components: {
    segment: {
      style: {
        // Default stroke used in cases
        // when no data for pie were found.
        stroke: 'border',
        transition: 'opacity 0.2s linear',
        '&:hover': { opacity: 0.8 }
      }
    }
  }
};
