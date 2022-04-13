import React, { Fragment, useContext } from 'react';
import { useThemedFactory } from '../../hooks';
import { SystemContext } from '../SystemContext';
import { TextCompletionContext } from './TextCompletionContext';

export const TextCompletionContent = () => {
  const useThemed = useThemedFactory<{ isSelected: boolean }>();
  const ThemedOption = useThemed('div', 'textCompletion.option');
  const { locale } = useContext(SystemContext);
  const { inputRef, options, setInnerValue, selectedIndex, handleDropClose } =
    useContext(TextCompletionContext);
  return (
    <Fragment>
      {options.length > 0 ? (
        options.map((v, i) => (
          <ThemedOption
            key={v.value}
            isSelected={i === selectedIndex}
            onClick={e => {
              setInnerValue(v.value);
              handleDropClose();
              inputRef.current?.focus();
              e.stopPropagation();
            }}
          >
            {v.render?.() ?? v.value}
          </ThemedOption>
        ))
      ) : (
        <ThemedOption isSelected={false} kind="empty">
          {locale.empty}
        </ThemedOption>
      )}
    </Fragment>
  );
};
