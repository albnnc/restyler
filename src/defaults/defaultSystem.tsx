import { System } from '../models';
import { defaultLocale } from './defaultLocale';
import { defaultTheme } from './defaultTheme';

export const defaultSystem = {
  defaults: {
    notificationOptions: {
      duration: 4000,
      placement: 'bottomRight'
    },
    transitionOptions: {
      timeout: 1000
    }
  },
  locale: defaultLocale,
  styled: (() => {
    throw new Error('styled function must be provided');
  }) as unknown,
  theme: defaultTheme,
  registry: {}
} as System;
