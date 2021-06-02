export const delay = (t: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined);
    }, t);
  });
