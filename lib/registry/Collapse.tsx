import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  CSSProperties,
  HTMLAttributes
} from 'react';
import { ComponentFactory, StyleProps } from '../models';

export interface CollapseProps
  extends HTMLAttributes<HTMLDivElement>,
    StyleProps {
  isOpen?: boolean;
}

export const createCollapse: ComponentFactory<
  HTMLDivElement,
  CollapseProps
> = ({ themed }) => {
  const ThemedColapse = themed('div', {
    path: 'collapse',
    style: { overflow: 'hidden' }
  });
  return forwardRef(({ isOpen, style, children, ...rest }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [openStyle, setOpenStyle] = useState({} as CSSProperties);
    const height = contentRef?.current?.offsetHeight;
    const closeStyle = { height: 0, opacity: 0 };
    useEffect(() => {
      setOpenStyle({ height: `${height?.toString() ?? ''}px` });
    }, [height]);
    const unionStyle = {
      ...(openStyle ? (isOpen ? openStyle : closeStyle) : false),
      ...style
    };
    return (
      <ThemedColapse {...rest} ref={ref} style={unionStyle}>
        <div ref={contentRef}>{children}</div>
      </ThemedColapse>
    );
  });
};
