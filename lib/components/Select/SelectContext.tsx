import { createContext, Dispatch } from 'react';

export const SelectContext = createContext({
  value: undefined as any,
  setValue: (() => {
    throw new Error('Value setting is allowed only inside Select');
  }) as Dispatch<{
    isForced?: boolean | undefined;
    value: any;
  }>,
  isMultiple: false,
  isOpen: false,
  handleClose: (() => {}) as (() => void) | undefined
});
