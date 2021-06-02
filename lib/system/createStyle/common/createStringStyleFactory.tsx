import { StyleFactory, StyleProps } from '~lib/models';

export const createStringStyleFactory = <T extends StyleProps>(
  targetProp: string,
  sourceProp: string,
  variableName?: string
): StyleFactory<T> => ({ variables, props }) => {
  const value = props[sourceProp];
  if (!targetProp || !sourceProp || !value) {
    return {};
  }
  return {
    [targetProp]: variables?.[variableName ?? sourceProp]?.[value] ?? value
  };
};
