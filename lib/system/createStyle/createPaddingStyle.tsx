import { isString } from '../../utils';
import {
  createDirectionMapStyleFactory,
  createStringStyleFactory
} from './common';

export const createPaddingStyle = createDirectionMapStyleFactory(
  'padding',
  'padding',
  isString,
  property => createStringStyleFactory(property, 'padding')
);
