import { createContext, Dispatch, RefObject } from 'react';
import { AutocompleteOption } from './Autocomplete';

const noop = () => {
  throw new Error('Must be called inside Autocomplete');
};

export const AutocompleteContext = createContext({
  inputRef: { current: null } as RefObject<HTMLInputElement>,
  options: [] as AutocompleteOption[],
  query: '',
  setQuery: noop as Dispatch<string>,
  innerValue: Symbol() as unknown,
  setInnerValue: noop as Dispatch<unknown>,
  selectedIndex: 0,
  setSelectedIndex: noop as Dispatch<number>,
  handleDropClose: noop as () => void
});
