import React, { forwardRef, useMemo, Children, HTMLAttributes } from 'react';
import { useThemed } from '../hooks';
import { StyleProps } from '../models';

export type StackAnchor =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

export interface StackProps extends HTMLAttributes<HTMLDivElement>, StyleProps {
  anchor?: StackAnchor;
  guidingChild?: number;
  interactiveChild?: number;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    { anchor, guidingChild = 0, interactiveChild = 0, children, ...rest },
    ref
  ) => {
    const ThemedStack = useThemed('div', {
      path: 'stack',
      style: { position: 'relative' }
    });
    const ThemedStackLayer = useThemed('div', { path: 'stack.layer' });
    const anchorStyle = useMemo(
      () => ({
        position: 'absolute',
        ...({
          center: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          },
          top: { top: 0, left: '50%', transform: 'translateX(-50%)' },
          bottom: { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
          left: { top: '50%', left: 0, transform: 'translateY(-50%)' },
          right: { top: '50%', right: 0, transform: 'translateY(-50%)' },
          topLeft: { top: 0, left: 0 },
          topRight: { top: 0, right: 0 },
          bottomLeft: { bottom: 0, left: 0 },
          bottomRight: { bottom: 0, right: 0 }
        }[anchor ?? ''] ?? {})
      }),
      [anchor]
    );
    return (
      <ThemedStack ref={ref} {...rest}>
        {Children.map(children, (v, i) => (
          <ThemedStackLayer
            style={{
              ...(i === guidingChild ? {} : anchorStyle),
              pointerEvents: i === interactiveChild ? 'auto' : 'none'
            }}
          >
            {v}
          </ThemedStackLayer>
        ))}
      </ThemedStack>
    );
  }
);
