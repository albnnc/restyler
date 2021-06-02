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
import { form } from './form';
import { global } from './global';
import { heading } from './heading';
import { input } from './input';
import { layer } from './layer';
import { menu } from './menu';
import { modal } from './modal';
import { notification } from './notification';
import { progress } from './progress';
import { radio } from './radio';
import { select } from './select';
import { tab } from './tab';
import { table } from './table';
import { variables } from './variables';

export const defaultTheme: Theme = {
  defaults,
  variables,

  anchor,
  box,
  button,
  card,
  carousel,
  collapse,
  checkbox,
  container,
  form,
  global,
  heading,
  input,
  layer,
  menu,
  modal,
  notification,
  progress,
  radio,
  select,
  tab,
  table
};
