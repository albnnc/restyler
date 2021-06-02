import { useReducer } from 'react';
import { useEffect } from 'react';
import { ComponentFactoryOptions, Locale, Theme } from '~lib/models';
import { Styled } from '~lib/models';
import { createRegistry, Registry } from '~lib/registry';
import { clone, deepFreeze } from '../utils';
import { createThemed } from './createThemed';

export const createSystem = (options: {
  locale: Locale;
  styled: Styled;
  theme: Theme;
}) => {
  const data = {
    locale: deepFreeze(clone<Locale>(options.locale)),
    registry: {} as Registry,
    theme: deepFreeze(clone<Theme>(options.theme)),
    updaters: [] as (() => void)[]
  };

  const updateRelated = {
    update: () => data.updaters.forEach(fn => fn()),
    useUpdates: () => {
      const [tick, update] = useReducer(v => v + 1, 0);
      useEffect(() => {
        data.updaters.push(update);
        return () => {
          data.updaters.splice(data.updaters.findIndex(v => v === update));
        };
      }, []);
    }
  };

  const themeRelated = {
    getTheme: () => data.theme,
    setTheme: (theme: Theme) => {
      data.theme = deepFreeze(clone(theme));
      updateRelated.update();
    },
    useTheme: () => {
      updateRelated.useUpdates();
      return themeRelated.getTheme();
    }
  };

  const decoratorsRelated = {
    themed: createThemed(options.styled, themeRelated.useTheme)
  };

  const componentCreatorOptions: ComponentFactoryOptions = {
    ...themeRelated,
    ...decoratorsRelated,
    locale: data.locale,
    registry: data.registry
  };

  // mutates data.registry
  createRegistry(componentCreatorOptions);

  const registryRelated = {
    getRegistry: () => data.registry
  };

  return {
    ...themeRelated,
    ...decoratorsRelated,
    ...registryRelated
  };
};
