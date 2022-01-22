import { centered, systemized } from './decorators';

export const parameters = {
  controls: { hideNoControlsWarning: true },
  backgrounds: {
    values: [
      {
        name: 'white',
        value: '#FFFFFF'
      },
      {
        name: 'grey',
        value: '#636363'
      },
      {
        name: 'lightGrey',
        value: '#C3C3C3'
      }
    ]
  }
};

export const decorators = [centered, systemized];
