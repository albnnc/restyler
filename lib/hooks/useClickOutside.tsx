import { useEffect, useRef } from 'react';

const defaultEvents = ['mousedown', 'touchstart'];

export const useClickOutside = <T extends HTMLElement, E extends Event = Event>(
  onClickOutside: (event: E) => void,
  events: string[] = defaultEvents
) => {
  const ref = useRef<T | null>(null);
  const savedCallback = useRef(onClickOutside);
  useEffect(() => {
    savedCallback.current = onClickOutside;
  }, [onClickOutside]);
  useEffect(() => {
    const handler = event => {
      const { current: el } = ref;
      el && !el.contains(event.target) && savedCallback.current(event);
    };
    const names = events.slice();
    for (const name of names) {
      document.addEventListener(name, handler);
    }
    return () => {
      for (const eventName of names) {
        document.removeEventListener(eventName, handler);
      }
    };
  }, [events, ref]);
  return ref;
};
