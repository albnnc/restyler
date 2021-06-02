import { isObject } from './guards';

export const set = (data: object, path: string | string[], value: any) => {
  const pathArray = Array.isArray(path) ? path : path.split('.');
  const len = pathArray.length;
  for (let i = 0; i < len - 1; i++) {
    const elem = pathArray[i];
    if (!data[elem] || !isObject(data[elem])) {
      data[elem] = {};
    }
    data = data[elem];
  }
  data[pathArray[len - 1]] = value;
};
