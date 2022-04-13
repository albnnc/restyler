import { createContext, Dispatch, RefObject } from 'react';
import { TextCompletionOption } from './TextCompletion';

const noop = () => {
  throw new Error('Must be called inside TextCompletion');
};

export const TextCompletionContext = createContext({
  inputRef: { current: null } as RefObject<HTMLInputElement>,
  options: [] as TextCompletionOption[],
  innerValue: '',
  setInnerValue: noop as Dispatch<string>,
  selectedIndex: 0,
  setSelectedIndex: noop as Dispatch<number>,
  handleDropClose: noop as () => void
});
