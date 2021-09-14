export const isHtmlElement = (v: any): v is HTMLElement => {
  try {
    // Using DOM API.
    return v instanceof HTMLElement;
  } catch (e) {
    // DOM API is not supported, e.g. during SSR.
    return (
      typeof v === 'object' &&
      v &&
      v.nodeType === 1 &&
      typeof v.style === 'object' &&
      typeof v.ownerDocument === 'object'
    );
  }
};
