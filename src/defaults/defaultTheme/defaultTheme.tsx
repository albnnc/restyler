import { Theme } from '../../models';
import { anchor } from './anchor';
import { box } from './box';
import { button } from './button';
import { card } from './card';
import { checkbox } from './checkbox';
import { collapse } from './collapse';
import { container } from './container';
import { defaults } from './defaults';
import { file } from './file';
import { form } from './form';
import { heading } from './heading';
import { input } from './input';
import { layer } from './layer';
import { masonry } from './masonry';
import { menu } from './menu';
import { modal } from './modal';
import { notification } from './notification';
import { pieChart } from './pieChart';
import { progress } from './progress';
import { radio } from './radio';
import { scroll } from './scroll';
import { select } from './select';
import { systemContainer } from './systemContainer';
import { tab } from './tab';
import { table } from './table';
import { textArea } from './textArea';
import { variables } from './variables';

export const defaultTheme: Theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: {
    smallest: '10px',
    smaller: '12px',
    small: '14px',
    medium: '16px',
    large: '20px',
    larger: '34px',
    largest: '42px'
  },
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 600
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  colors: {
    lighterGrey: '#f5f5f5',
    lightGrey: '#c3c3c3',
    grey: '#636363',
    darkGrey: '#494949',
    darkerGrey: '#212121',

    primary: '#17a1f7',
    info: '#51b8d8',
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
  radii: {
    small: '2px',
    medium: '4px',
    large: '8px'
  },

  defaults,
  variables,

  anchor,
  box,
  button,
  card,
  checkbox,
  collapse,
  container,
  file,
  form,
  heading,
  input,
  layer,
  masonry,
  menu,
  modal,
  notification,
  pieChart,
  progress,
  radio,
  scroll,
  select,
  systemContainer,
  tab,
  table,
  textArea
};
