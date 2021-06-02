import { Variables } from '~lib/models';

export const variables: Variables = {
  palette: {
    black: '#000000',
    white: '#ffffff',
    'grey-dark': '#212121',
    grey: 'TODO',
    'grey-light': '#f5f5f5',
    primary: '#17a1f7',
    danger: '#f44336',
    warning: '#f59200',
    success: '#40af45',
    'text-light': 'rgba(0, 0, 0, 0.4)',
    text: 'rgba(0, 0, 0, 0.7)',
    'text-dark': 'rgba(0, 0, 0, 0.9)',
    border: 'rgba(0, 0, 0, 0.15)'
  },
  elevation: {
    none: 'none',
    'xx-small':
      '0px 2px 1px -1px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 1px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    'x-small':
      '0px 3px 1px -2px rgba(0, 0, 0, 0.12), ' +
      '0px 2px 2px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
    small:
      '0px 3px 3px -2px rgba(0, 0, 0, 0.12), ' +
      '0px 3px 4px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 8px 0px rgba(0, 0, 0, 0.12)',
    medium:
      '0px 2px 4px -1px rgba(0, 0, 0, 0.12), ' +
      '0px 4px 5px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    large:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.12), ' +
      '0px 6px 10px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    'x-large':
      '0px 5px 5px -3px rgba(0, 0, 0, 0.12), ' +
      '0px 8px 10px 1px rgba(0, 0, 0, 0.12), ' +
      '0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
    'xx-large':
      '0px 6px 6px -3px rgba(0, 0, 0, 0.12), ' +
      '0px 10px 14px 1px rgba(0, 0, 0, 0.12), ' +
      '0px 4px 18px 3px rgba(0, 0, 0, 0.12)'
  },
  radius: {
    none: 0,
    'xx-small': '1px',
    'x-small': '2px',
    small: '3px',
    medium: '4px',
    large: '8px',
    'x-large': '12px',
    'xx-large': '16px'
  },
  padding: {
    none: 0,
    'xx-small': '0.1rem',
    'x-small': '0.25rem',
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
    'x-large': '4rem',
    'xx-large': '8rem'
  },
  margin: {
    none: 0,
    'xx-small': '0.1rem',
    'x-small': '0.25rem',
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
    'x-large': '4rem',
    'xx-large': '8rem'
  },
  font: {
    'xx-small': '10px',
    'x-small': '12px',
    small: '14px',
    medium: '16px',
    large: '20px',
    'x-large': '34px',
    'xx-large': '42px'
  },
  weight: {
    regular: 400,
    light: 300,
    bold: 500
  },
  justify: {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly'
  },
  align: {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline'
  }
};
