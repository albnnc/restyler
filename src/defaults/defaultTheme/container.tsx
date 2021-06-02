import { Theme } from '../../models';

export const container: Theme = {
  direction: 'row',
  justify: 'center',
  content: {
    extend: {
      width: '80%',
      maxWidth: '1024px',
      '@media screen and (max-width: 500px)': {
        width: 'calc(100% - 2.5rem)'
      }
    }
  }
};
