import { Theme } from '../../models';

export const pieChart: Theme = {
  segment: {
    extend: {
      transition: 'opacity 0.2s',
      '&:hover': {
        opacity: 0.8
      }
    }
  }
};
