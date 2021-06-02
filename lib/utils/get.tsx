export const get = (data: object, path: string, defaultValue?: any) =>
  String(path)
    .split('.')
    .reduce((acc, v) => {
      try {
        acc = acc[v] === undefined ? defaultValue : acc[v];
      } catch (e) {
        return defaultValue;
      }
      return acc;
    }, data);
