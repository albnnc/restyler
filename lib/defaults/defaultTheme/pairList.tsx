import { BasicTheme } from '../../models';

export const pairList: BasicTheme = {
  components: {
    item: {
      style: {
        display: 'flex'
      },
      kinds: {
        expanded: {
          style: {
            flexDirection: 'column'
          }
        }
      },
      components: {
        title: { style: { minWidth: '200px' } },
        content: { style: {} }
      }
    }
  }
};
