import { Theme } from '../../models';

export const container: Theme = {
  padding: { horizontal: 'large' },
  direction: 'row',
  justify: 'center',
  content: {
    extend: {
      width: '80%',
      maxWidth: '1024px'
    }
  }
};
