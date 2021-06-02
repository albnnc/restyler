import { Theme } from '../../models';
import { anchor } from './anchor';
import { box } from './box';
import { button } from './button';
import { card } from './card';
import { carousel } from './carousel';
import { checkbox } from './checkbox';
import { collapse } from './collapse';
import { container } from './container';
import { defaults } from './defaults';
import { file } from './file';
import { form } from './form';
import { global } from './global';
import { heading } from './heading';
import { input } from './input';
import { layer } from './layer';
import { menu } from './menu';
import { modal } from './modal';
import { notification } from './notification';
import { pieChart } from './pieChart';
import { progress } from './progress';
import { radio } from './radio';
import { scroll } from './scroll';
import { select } from './select';
import { tab } from './tab';
import { table } from './table';
import { textArea } from './textArea';
import { variables } from './variables';

export const defaultTheme: Theme = {
  defaults,
  variables,

  anchor,
  box,
  button,
  card,
  carousel,
  checkbox,
  collapse,
  container,
  file,
  form,
  global,
  heading,
  input,
  layer,
  menu,
  modal,
  notification,
  pieChart,
  progress,
  radio,
  scroll,
  select,
  tab,
  table,
  textArea
};
