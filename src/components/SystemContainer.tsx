import React, { forwardRef, HTMLAttributes, useEffect, useState } from 'react';
import { defaultSystem } from '../defaults';
import { useImperativePortal, useThemed } from '../hooks';
import { PartiallyRequired, ThemeProps, System } from '../models';
import { set } from '../utils';
import { SystemContext } from './SystemContext';

export type SystemOptions = PartiallyRequired<System, 'styled'>;

export interface SystemContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    ThemeProps,
    SystemOptions {}

export const SystemContainer = forwardRef<HTMLDivElement, SystemContainerProps>(
  ({ defaults, locale, registry, styled, theme, children, ...rest }, ref) => {
    const options = {
      defaults,
      locale,
      registry,
      theme,
      styled
    } as SystemOptions;
    Object.keys(options).forEach(
      k => options[k] === undefined && delete options[k]
    );

    const [system, setSystem] = useState({
      ...defaultSystem,
      ...options
    });
    const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
    const portal = useImperativePortal(portalNode);

    useEffect(() => {
      const portalPaths = [
        'defaults.standaloneTransitionOptions.portal',
        'defaults.meterOptions.portal'
      ];
      const next = { ...system };
      portalPaths.forEach(v => set(next, v, portal));
      setSystem(next);
    }, [portal]);

    return (
      <SystemContext.Provider value={system}>
        <SystemContainerContextGrabber ref={ref} {...rest}>
          <div ref={setPortalNode} />
          {portal}
          {children}
        </SystemContainerContextGrabber>
      </SystemContext.Provider>
    );
  }
);

SystemContainer.displayName = 'SystemContainer';

const SystemContainerContextGrabber = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & ThemeProps
>((props, ref) => {
  const ThemedSystemContainer = useThemed('div', { key: 'systemContainer' });
  return <ThemedSystemContainer ref={ref} {...props} />;
});

SystemContainerContextGrabber.displayName = 'SystemContainerContextGrabber';
