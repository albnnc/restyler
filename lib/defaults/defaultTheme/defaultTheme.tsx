import { BasicTheme } from '../../models';
import { anchor } from './anchor';
import { box } from './box';
import { button } from './button';
import { card } from './card';
import { checkbox } from './checkbox';
import { collapse } from './collapse';
import { container } from './container';
import { defaults } from './defaults';
import { drop } from './drop';
import { file } from './file';
import { form } from './form';
import { heading } from './heading';
import { input } from './input';
import { layer } from './layer';
import { masonry } from './masonry';
import { menu } from './menu';
import { modal } from './modal';
import { notification } from './notification';
import { pairList } from './pairList';
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
  radii: [0, 2, 4, 8],
  fontSizes: [10, 12, 14, 16, 20, 26, 42, 48, 56],
  fonts: {
    body: 'Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontWeights: {
    body: 400,
    heading: 300
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  colors: {
    primary: '#17A1F7',
    success: '#40AF45',
    warning: '#F59200',
    danger: '#F44336',
    surface: '#FFFFFF',
    background: '#EFEFEF',
    accentPrimary: '#1393E2',
    accentSuccess: '#35973A',
    accentWarning: '#DB8400',
    accentDanger: '#D33125',
    accentSurface: '#F3F3F3',
    accentBackground: '#E0E0E0',
    onPrimary: '#FFFFFF',
    onSuccess: '#FFFFFF',
    onDanger: '#FFFFFF',
    onSurface: '#282828',
    onBackground: '#121212',
    border: 'rgba(0, 0, 0, 0.17)'
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
    anchor,
    box,
    button,
    card,
    checkbox,
    collapse,
    container,
    defaults,
    drop,
    file,
    form,
    heading,
    input,
    layer,
    masonry,
    menu,
    modal,
    notification,
    pairList,
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
