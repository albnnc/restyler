export const requestAnimationDelay = (fn: () => void) => {
  let tick = 0;
  const count = () => {
    if (tick < 100) {
      ++tick;
      requestAnimationFrame(count);
    } else {
      fn();
    }
  };
  count();
};
