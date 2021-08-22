import { BasicTheme } from '../../models';

export const card: BasicTheme = {
  style: {
    borderRadius: 2,
    boxShadow: 2,
    backgroundColor: 'white'
  },
  kinds: {
    body: { style: { p: 3 } }
  },
  components: {
    body: { style: { p: 3 } },
    header: { style: { px: 3, pt: 3 } },
    footer: { style: { px: 3, pb: 3 } }
  }
};
