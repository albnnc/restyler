import { BasicTheme } from '../../models';

export const heading: BasicTheme = {
  style: {
    marginTop: 2,
    marginBottom: 1,
    fontSize: 5,
    fontWeight: 'light',
    lineHeight: 'heading',
    color: 'strongText'
  },
  kinds: {
    1: { style: { mt: 3, mb: 2, fontSize: 8 } },
    2: { style: { mt: 3, mb: 2, fontSize: 7 } },
    3: { style: { mt: 3, mb: 2, fontSize: 6 } },
    4: { style: { mt: 2, mb: 1, fontSize: 5 } },
    5: { style: { mt: 2, mb: 1, fontSize: 4 } },
    6: { style: { mt: 2, mb: 1, fontSize: 3 } }
  }
};
