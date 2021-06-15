import {
  DependencyList,
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  PropsWithoutRef,
  RefAttributes,
  useMemo
} from 'react';

export const useForwardRef = <T, P>(
  componentOrFunction:
    | ForwardRefRenderFunction<T, P>
    | ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>,
  deps: DependencyList
) => {
  return useMemo(() => {
    console.log('CHANGED');
    return typeof componentOrFunction === 'function'
      ? // Actually, forwardRef result is an object,
        // so it's safe to perform casting here.
        forwardRef<T, P>(componentOrFunction as any)
      : componentOrFunction;
  }, deps);
};
