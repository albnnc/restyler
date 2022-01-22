import { BasicTheme } from '../../models';

export const pairList: BasicTheme = {
  components: {
    item: {
      style: {
        display: 'flex'
      },
      components: {
        left: { style: { minWidth: '200px' } },
        right: { style: {} }
      }
    }
  }
};
