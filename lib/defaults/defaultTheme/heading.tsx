import { ComponentTheme } from '~lib/models';

export const heading: ComponentTheme = {
  margin: { top: 'small', bottom: 'x-small' },
  font: 'large',
  weight: 'light',
  color: 'text-dark',
  kinds: {
    1: {
      margin: { top: 'large', bottom: 'small' },
      font: '56px'
    },
    2: {
      margin: { top: 'large', bottom: 'small' },
      font: 'xx-large'
    },
    3: {
      margin: { top: 'medium', bottom: 'small' },
      font: 'x-large'
    },
    4: {
      margin: { top: 'small', bottom: 'x-small' },
      font: 'large'
    }
  }
};
