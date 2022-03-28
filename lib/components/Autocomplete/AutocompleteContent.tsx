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
  const {
    inputRef,
    options,
    setQuery,
    innerValue,
    setInnerValue,
    selectedIndex,
    handleDropClose
  } = useContext(AutocompleteContext);
  return (
    <Fragment>
      {options.length > 0 ? (
        options.map((v, i) => (
          <ThemedOption
            key={v.key}
            isActive={'value' in v && v.value === innerValue}
            isSelected={i === selectedIndex}
            onClick={e => {
              setQuery(v.query);
              setInnerValue('value' in v ? v.value : v.query);
              handleDropClose();
              inputRef.current?.focus();
              e.stopPropagation();
            }}
          >
            {v.render?.() ?? v.query}
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
