import { RefObject } from 'react';

let supportsPassive = false;
try {
  addEventListener(
    'test',
    null as any,
    Object.defineProperty({}, 'passive', {
      get() {
        supportsPassive = true;
      }
    })
  );
} catch (e) {}

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent =
  'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

let lastScroll: undefined | { x: number; y: number };
const forceLastScroll = () => {
  if (lastScroll) {
    const { x, y } = lastScroll;
    scrollTo(x, y);
  }
};

export const disableScroll = (options?: {
  allowedRefs?: RefObject<HTMLElement>[];
}) => {
  lastScroll = { x: scrollX, y: scrollY };
  addEventListener('scroll', forceLastScroll);

  const preventDefault = e => {
    const filtered = e.path.filter(v => v instanceof HTMLElement);
    if (
      filtered.some(pathNode =>
        options?.allowedRefs?.some(v => v && v.current?.isSameNode(pathNode))
      )
    ) {
      return;
    }
    e.preventDefault();
  };

  const preventKeyScroll = e => {
    if ([37, 38, 39, 40].includes(e.keyCode)) {
      e.preventDefault();
    }
  };

  addEventListener('DOMMouseScroll', preventDefault);
  addEventListener(wheelEvent, preventDefault, wheelOpt);
  addEventListener('touchmove', preventDefault, wheelOpt);
  addEventListener('keydown', preventKeyScroll);

  return () => {
    lastScroll = undefined;
    removeEventListener('scroll', forceLastScroll);
    removeEventListener('DOMMouseScroll', preventDefault);
    removeEventListener(wheelEvent, preventDefault);
    removeEventListener('touchmove', preventDefault);
    removeEventListener('keydown', preventKeyScroll);
  };
};
