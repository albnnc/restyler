import { knownStyleProps } from '../models';

export const filterStyleProps = (data: any) => {
  if (typeof data !== 'object') {
    return data;
  }
  const styleProps = { ...data };
  const rest = { ...data };
  Reflect.ownKeys(styleProps).forEach((k: string) => {
    if (!knownStyleProps.includes(k)) {
      delete styleProps[k];
    }
  });
  knownStyleProps.forEach(p => delete rest[p]);
  return {
    styleProps,
    ...rest
  };
};
