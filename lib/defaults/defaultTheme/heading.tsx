import { BasicTheme } from '../../models';

export const heading: BasicTheme = {
  style: {
    marginTop: 2,
    marginBottom: 1,
    fontSize: 5,
    letterSpacing: '0.04em',
    fontWeight: 'heading',
    lineHeight: 'heading',
    color: 'inherit',
    '&:is(h1)': { mt: 3, mb: 2, fontSize: 8 },
    '&:is(h2)': { mt: 3, mb: 2, fontSize: 7 },
    '&:is(h3)': { mt: 3, mb: 2, fontSize: 6 },
    '&:is(h4)': { mt: 2, mb: 1, fontSize: 5 },
    '&:is(h5)': { mt: 2, mb: 1, fontSize: 4 },
    '&:is(h6)': { mt: 2, mb: 1, fontSize: 3 }
  },
  kinds: {
    modal: {
      style: { '&&': { mt: 2, mb: 1, fontSize: 5 } }
    },
    motto: {
      style: {
        '&&': {
          marginX: 0,
          marginY: 0,
          fontSize: 8,
          textTransform: 'uppercase'
        }
      }
    }
  }
};
