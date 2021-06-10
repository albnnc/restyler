export const getIndexOfMax = (values: number[]) =>
  values.reduce((iMax, x, i, a) => (x > a[iMax] ? i : iMax), 0);
