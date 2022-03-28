import { createContext, Dispatch } from 'react';
import { AutocompleteOption } from './Autocomplete';

const noop = () => {
  throw new Error('Value setting is allowed only inside Autocomplete');
};

export const AutocompleteContext = createContext({
  options: [] as AutocompleteOption[],
  innerValue: Symbol() as unknown,
  setInnerValue: noop as Dispatch<unknown>,
  selectedIndex: -1,
  setSelectedIndex: noop as Dispatch<number>
});
