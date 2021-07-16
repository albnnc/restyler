import { useEffect, useRef, RefObject } from 'react';

const defaultEvents = ['mousedown', 'touchstart'];

export const useClickOutside = <T extends Event = Event>(
  ref: RefObject<HTMLElement | null>,
  onClickOutside: (event: T) => void,
  events: string[] = defaultEvents
) => {
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
};
