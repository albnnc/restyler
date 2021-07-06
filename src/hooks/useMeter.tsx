import React, { ReactNode, useCallback, useContext, useMemo } from 'react';
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
  const { deps, portal } = {
    ...defaults?.meterOptions,
    ...options
  };
  return useMemo(() => {
    if (!portal) {
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
              portal.remove(wrap);
            }}
            style={{
              position: 'fixed',
              top: '100vw',
              left: '100vh',
              visibility: 'hidden'
            }}
          >
            {children}
          </div>
        );
        portal.push(wrap);
      });
  }, [portal, ...(deps ?? [])]);
};
