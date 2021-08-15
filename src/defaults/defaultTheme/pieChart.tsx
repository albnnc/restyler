import { Theme } from '../../models';

export const pieChart: Theme = {
  style: {
    width: '100%',
    verticalAlign: 'middle'
  },
  segment: {
    style: {
      transition: 'opacity 0.2s linear',
      '&:hover': { opacity: 0.8 }
    }
  }
};
