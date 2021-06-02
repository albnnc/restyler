import { useState } from 'react';
import { useEffect } from 'react';
import { ComponentFactoryOptions, Locale, Theme } from '../models';
import { Styled } from '../models';
import { createRegistry, Registry } from '../registry';
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
    updateEffects: [] as (() => void)[]
  };

  const updateRelated = {
    update: () => data.updateEffects.forEach(fn => fn()),
    useUpdateEffect: (fn: () => void) => {
      useEffect(() => {
        data.updateEffects.push(fn);
        return () => {
          data.updateEffects.splice(
            data.updateEffects.findIndex(v => v === fn)
          );
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
      const [theme, setTheme] = useState<Theme>(themeRelated.getTheme());
      updateRelated.useUpdateEffect(() => {
        setTheme(themeRelated.getTheme());
      });
      return theme;
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
