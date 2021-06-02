const blocks = new Set<HTMLElement>();

export const disableScroll = (
  element: HTMLElement = document.documentElement
) => {
  if (!element || blocks.has(element)) {
    return () => {};
  }
  blocks.add(element);
  const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
  const blockingStyle = {
    overflowY: 'hidden',
    paddingRight: scrollWidth + 'px'
  };
  const initialStyle = Reflect.ownKeys(blockingStyle).reduce(
    (prev, curr) => ({ ...prev, [curr]: element.style[curr] }),
    {}
  );
  Object.assign(element.style, blockingStyle);
  return () => {
    Object.assign(element.style, initialStyle);
    blocks.delete(element);
  };
};
