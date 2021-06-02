import { Theme } from '../../models';

export const heading: Theme = {
  margin: { top: 'small', bottom: 'smaller' },
  font: 'large',
  weight: 'light',
  color: 'strongText',
  kinds: {
    1: {
      margin: { top: 'large', bottom: 'small' },
      font: '56px'
    },
    2: {
      margin: { top: 'large', bottom: 'small' },
      font: 'largest'
    },
    3: {
      margin: { top: 'medium', bottom: 'small' },
      font: 'larger'
    },
    4: {
      margin: { top: 'small', bottom: 'smaller' },
      font: 'large'
    }
  }
};
