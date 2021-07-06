import { forwardRef, HTMLAttributes, useEffect, useState } from 'react';
import { set } from '../utils';
import { useImperativePortal, useThemed } from '../hooks';
import { PartiallyRequired, StyleProps, System } from '../models';
import { defaultSystem } from '../defaults';
import { SystemContext } from './SystemContext';

export type SystemOptions = PartiallyRequired<System, 'styled'>;

export interface SystemContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps,
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
  HTMLAttributes<HTMLDivElement> & StyleProps
>((props, ref) => {
  const ThemedSystemContainer = useThemed('div', { path: 'systemContainer' });
  return <ThemedSystemContainer ref={ref} {...props} />;
});

SystemContainerContextGrabber.displayName = 'SystemContainerContextGrabber';
