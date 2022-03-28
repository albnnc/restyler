import React, { Fragment, useContext } from 'react';
import { useThemedFactory } from '../../hooks';
import { SystemContext } from '../SystemContext';
import { AutocompleteContext } from './AutocompleteContext';

export const AutocompleteContent = () => {
  const useThemed = useThemedFactory<{
    isActive: boolean;
    isSelected: boolean;
  }>();
  const ThemedOption = useThemed('div', 'autocomplete.option');
  const { locale } = useContext(SystemContext);
  const { options, innerValue, setInnerValue, selectedIndex } =
    useContext(AutocompleteContext);
  return (
    <Fragment>
      {options.length > 0 ? (
        options.map((v, i) => (
          <ThemedOption
            key={v.key}
            isActive={v.value === innerValue}
            isSelected={i === selectedIndex}
            onClick={e => {
              setInnerValue(v.value);
              e.stopPropagation();
            }}
          >
            {v.title}
          </ThemedOption>
        ))
      ) : (
        <ThemedOption isActive={false} isSelected={false} kind="empty">
          {locale.empty}
        </ThemedOption>
      )}
    </Fragment>
  );
};
