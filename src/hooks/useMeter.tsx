import React, { ReactNode, useContext, useMemo } from 'react';
import { SystemContext } from '../components';
import { ImperativePortal } from './useImperativePortal';

export interface MeterOptions {
  deps?: any[];
  portal?: ImperativePortal;
}

export const useMeter = <T extends unknown>(
  extract: (container: HTMLDivElement) => T,
  options: MeterOptions
) => {
  const { defaults } = useContext(SystemContext);
  const { deps, portal: { push = undefined, remove = undefined } = {} } = {
    ...defaults?.meterOptions,
    ...options
  };
  return useMemo(() => {
    if (!push || !remove) {
      return undefined;
    }
    return (children?: ReactNode) =>
      new Promise<T>(resolve => {
        const key = Math.random();
        const wrap = (
          <div
            key={key}
            ref={container => {
              if (!container) {
                return;
              }
              resolve(extract?.(container));
              remove(wrap);
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              visibility: 'hidden',
              pointerEvents: 'none'
            }}
          >
            {children}
          </div>
        );
        push(wrap);
      });
  }, [push, remove, ...(deps ?? [])]);
};
