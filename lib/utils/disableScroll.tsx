import { RefObject } from 'react';

const getWheelEvent = () => {
  let elem = document.getElementById('__test');
  if (!elem) {
    elem = document.createElement('div');
    elem.setAttribute('id', '__test');
  }
  return 'onwheel' in elem ? 'wheel' : 'mousewheel';
};

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
    const filtered = e.composedPath().filter(v => v instanceof HTMLElement);
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

  const wheelEvent = getWheelEvent();

  addEventListener('DOMMouseScroll', preventDefault);
  addEventListener(wheelEvent, preventDefault, { passive: false });
  addEventListener('touchmove', preventDefault, { passive: false });
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
