import { Theme } from '../../models';

export const container: Theme = {
  style: {
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    style: {
      width: '80%',
      maxWidth: '1024px',
      '@media screen and (max-width: 500px)': {
        width: 'calc(100% - 2.5rem)'
      }
    }
  }
};
