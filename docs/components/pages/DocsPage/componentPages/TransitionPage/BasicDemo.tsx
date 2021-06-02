import { keyframes } from '@emotion/core';
import { Box, Button } from 'docs/components/shared';
import { useTransition, BoxProps } from 'lib';
import { forwardRef, useRef, useState } from 'react';

export const BasicDemo = () => {
  const [isMounted, setIsMounted] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [isReallyMounted, transitionProps] = useTransition(ref, isMounted);
  return (
    <Box css={{ position: 'relative' }}>
      <Button kind="primary" onClick={() => setIsMounted(!isMounted)}>
        Toggle
      </Button>
      {isReallyMounted && <Spinner ref={ref} {...transitionProps} />}
    </Box>
  );
};

const Spinner = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box
    ref={ref}
    margin={{ left: 'medium' }}
    css={{
      position: 'absolute',
      right: '-2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '1.5rem',
      height: '1.5rem',
      transition: 'all 0.5s',
      opacity: 1,
      boxSizing: 'content-box',
      '&[data-transition]': {
        opacity: 0
      },
      '&::after': {
        content: '""',
        display: 'block',
        boxSizing: 'border-box',
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: '50%',
        border: '3px solid rgba(0, 0, 0, 0.3)',
        borderTopColor: 'rgba(0, 0, 0, 0.7)',
        animation: `${loaderAnimation} 1.4s infinite linear`
      }
    }}
    {...props}
  />
));

const loaderAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
});
