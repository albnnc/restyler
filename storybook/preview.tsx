import { centered, systemized } from './decorators';
import { defaultTheme } from 'src';

const { variables: { palette = {} } = {} } = defaultTheme;
export const parameters = {
  controls: { hideNoControlsWarning: true },
  backgrounds: {
    values: [
      {
        name: 'white',
        value: palette.white
      },
      {
        name: 'grey',
        value: palette.grey
      },
      {
        name: 'lightGrey',
        value: palette.lightGrey
      }
    ]
  }
};

export const decorators = [centered, systemized];
