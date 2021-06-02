import { Variables } from '../../models';

export const variables: Variables = {
  palette: {
    black: '#000000',
    white: '#ffffff',

    grey: '#575757',
    lightGrey: '#f5f5f5',
    darkGrey: '#212121',

    primary: '#17a1f7',
    success: '#40af45',
    danger: '#f44336',
    warning: '#f59200',

    text: 'rgba(0, 0, 0, 0.7)',
    weakText: 'rgba(0, 0, 0, 0.4)',
    strongText: 'rgba(0, 0, 0, 0.9)',

    lightText: 'rgba(255, 255, 255, 0.7)',
    weakLightText: 'rgba(255, 255, 255, 0.4)',
    strongLightText: 'rgba(255, 255, 255, 0.9)',

    border: 'rgba(0, 0, 0, 0.15)',
    weakBorder: 'rgba(0, 0, 0, 0.1)',
    strongBorder: 'rgba(0, 0, 0, 0.2)'
  },
  elevation: {
    none: 'none',
    smallest:
      '0px 2px 1px -1px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 1px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    smaller:
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
    larger:
      '0px 5px 5px -3px rgba(0, 0, 0, 0.12), ' +
      '0px 8px 10px 1px rgba(0, 0, 0, 0.12), ' +
      '0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
    largest:
      '0px 6px 6px -3px rgba(0, 0, 0, 0.12), ' +
      '0px 10px 14px 1px rgba(0, 0, 0, 0.12), ' +
      '0px 4px 18px 3px rgba(0, 0, 0, 0.12)'
  },
  radius: {
    none: 0,
    smallest: '1px',
    smaller: '2px',
    small: '3px',
    medium: '4px',
    large: '8px',
    larger: '12px',
    largest: '16px'
  },
  padding: {
    none: 0,
    smallest: '0.1rem',
    smaller: '0.25rem',
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
    larger: '4rem',
    largest: '8rem'
  },
  margin: {
    none: 0,
    smallest: '0.1rem',
    smaller: '0.25rem',
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
    larger: '4rem',
    largest: '8rem'
  },
  wrap: {
    reverse: 'wrap-reverse'
  },
  font: {
    smallest: '10px',
    smaller: '12px',
    small: '14px',
    medium: '16px',
    large: '20px',
    larger: '34px',
    largest: '42px'
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
