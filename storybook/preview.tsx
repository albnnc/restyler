import { defaultTheme } from 'src';
import { centered, systemized } from './decorators';

const { colors = {} } = defaultTheme;
export const parameters = {
  controls: { hideNoControlsWarning: true },
  backgrounds: {
    values: [
      {
        name: 'white',
        value: 'white'
      },
      {
        name: 'grey',
        value: colors.grey
      },
      {
        name: 'lightGrey',
        value: colors.lightGrey
      }
    ]
  }
};

export const decorators = [centered, systemized];
