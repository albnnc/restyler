import { Theme } from '../../models';

export const card: Theme = {
  style: {
    borderRadius: 2,
    boxShadow: 2,
    backgroundColor: 'white'
  },
  kinds: {
    body: { style: { p: 3 } }
  },
  body: { style: { p: 3 } },
  header: { style: { px: 3, pt: 3 } },
  footer: { style: { px: 3, pb: 3 } }
};
