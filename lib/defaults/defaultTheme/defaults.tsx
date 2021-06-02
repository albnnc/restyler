import { Theme } from '../../models';

export const defaults: Theme = {
  padding: 'none',
  margin: 'none',
  font: 'inherit',
  color: 'inherit',
  extend: {
    lineHeight: 1.5,
    fontFamily: 'Roboto, sans-serif',
    boxSizing: 'border-box'
  }
};
