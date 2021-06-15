import React, {
  forwardRef,
  Fragment,
  ReactElement,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';

export interface ImperativePortal extends ReactElement {
  push: (child: ReactNode) => void;
  remove: (child: ReactNode) => void;
}

export const useImperativePortal = (element?: HTMLElement | null) => {
  const ref = useRef<ImperativePortal>(null);
  return useMemo(() => {
    const wrap = (
      <Fragment>
        <Portal ref={ref} element={element} />
      </Fragment>
    );
    const noop = () => {};
    return {
      ...wrap,
      push: ref.current?.push ?? noop,
      remove: ref.current?.remove ?? noop
    } as ImperativePortal;
  }, [element]);
};

const Portal = forwardRef<
  Pick<ImperativePortal, 'push' | 'remove'>,
  { element?: HTMLElement | null }
>(({ element }, ref) => {
  const [children, setChildren] = useState<ReactNode[]>([]);
  const push = useCallback((child: ReactNode) => {
    setChildren(children =>
      children.includes(child) ? children : children.concat([child])
    );
  }, []);
  const remove = useCallback((child: ReactNode) => {
    setChildren(children => children.filter(v => v !== child));
  }, []);
  useImperativeHandle(ref, () => ({ push, remove }), []);
  return element ? createPortal(children, element) : null;
});
