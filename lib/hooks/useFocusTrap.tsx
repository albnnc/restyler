import { useEffect, useState, RefObject } from 'react';
import { useStack } from './useStack';

export const useFocusTrap = <T extends HTMLElement>(ref: RefObject<T>) => {
  const isOnTop = useStack(ref);

  const [firstFocusable, setFirstFocusable] = useState<HTMLElement | undefined>(
    undefined
  );
  const [lastFocusable, setLastFocusable] = useState<HTMLElement | undefined>(
    undefined
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || !isOnTop) {
      return;
    }
    const focusables = el.querySelectorAll(focusableSelector);
    const first = focusables[0] as HTMLElement | undefined;
    const last = focusables[focusables.length - 1] as HTMLElement | undefined;
    setFirstFocusable(first);
    setLastFocusable(last);
    const hasActiveElement =
      document.activeElement || document.activeElement !== document.body;
    if (!hasActiveElement || el.contains(document.activeElement)) {
      return;
    }
    if (!first || !last) {
      (document.activeElement as HTMLElement)?.blur();
    } else {
      first.focus();
    }
    // One needs to update focusables on each component
    // rerender, so we don't specify deps.
  });

  useEffect(() => {
    if (!isOnTop || typeof window === 'undefined') {
      return;
    }
    const listener = e => {
      if (e.key !== 'Tab') {
        return;
      }
      const hasActiveElement =
        document.activeElement || document.activeElement !== document.body;
      if (hasActiveElement) {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable?.focus();
          }
        }
      } else {
        firstFocusable?.focus();
      }
      e.preventDefault();
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [isOnTop, firstFocusable, lastFocusable]);
};

const focusableSelector =
  'a[href]:not([disabled])' +
  ', ' +
  'button:not([disabled])' +
  ', ' +
  'textarea:not([disabled])' +
  ', ' +
  'input[type="text"]:not([disabled])' +
  ', ' +
  'input[type="radio"]:not([disabled])' +
  ', ' +
  'input[type="checkbox"]:not([disabled])' +
  ', ' +
  'select:not([disabled])';
