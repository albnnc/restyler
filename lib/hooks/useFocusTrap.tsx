import { useEffect, RefObject } from 'react';

export const useFocusTrap = <T extends HTMLElement>(ref: RefObject<T>) => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const el = ref.current;
    const focusableEls = el.querySelectorAll(focusableSelector);
    const firstFocusable = focusableEls[0] as HTMLElement | undefined;
    const lastFocusable = focusableEls[focusableEls.length - 1] as
      | HTMLElement
      | undefined;

    if (!firstFocusable || !lastFocusable) {
      (document.activeElement as any)?.blur();
      return;
    }

    firstFocusable.focus();

    const onKey = e => {
      if (e.key !== 'Tab') {
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable?.focus();
          e.preventDefault();
        }
      }
    };

    el.addEventListener('keydown', onKey);

    return () => {
      el.removeEventListener('keydown', onKey);
    };
  }, [ref.current]);
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
