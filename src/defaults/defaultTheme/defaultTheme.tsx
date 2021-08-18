import { BasicTheme } from '../../models';
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

export const defaultTheme: BasicTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [10, 12, 14, 16, 20, 26, 42, 48, 56],
  radii: [0, 2, 4, 8],
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

    border: 'rgba(0, 0, 0, 0.15)',
    weakBorder: 'rgba(0, 0, 0, 0.1)',
    strongBorder: 'rgba(0, 0, 0, 0.2)'
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 1px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    '0px 3px 1px -2px rgba(0, 0, 0, 0.12), ' +
      '0px 2px 2px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
    '0px 3px 3px -2px rgba(0, 0, 0, 0.12), ' +
      '0px 3px 4px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 8px 0px rgba(0, 0, 0, 0.12)',
    '0px 2px 4px -1px rgba(0, 0, 0, 0.12), ' +
      '0px 4px 5px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    '0px 3px 5px -1px rgba(0, 0, 0, 0.12), ' +
      '0px 6px 10px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    '0px 5px 5px -3px rgba(0, 0, 0, 0.12), ' +
      '0px 8px 10px 1px rgba(0, 0, 0, 0.12), ' +
      '0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
    '0px 6px 6px -3px rgba(0, 0, 0, 0.12), ' +
      '0px 10px 14px 1px rgba(0, 0, 0, 0.12), ' +
      '0px 4px 18px 3px rgba(0, 0, 0, 0.12)'
  ],

  components: {
    defaults,
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
  }
};
