export const onNextFrame = (fn: () => void) => {
  let tick = 0;
  const count = () => {
    if (tick < 10) {
      ++tick;
      requestAnimationFrame(count);
    } else {
      fn();
    }
  };
  count();
};
