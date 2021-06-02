import { keyframes } from '@emotion/react';
import { Meta } from '@storybook/react';
import React, { useRef, useState } from 'react';
import { Box, Button, useTransition } from 'src';

export default {
  title: 'hooks/useTransition'
} as Meta;

const spinAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
});

export const Basics = () => {
  const [isMounted, setIsMounted] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [isReallyMounted, transitionProps] = useTransition(ref, isMounted);
  return (
    <Box css={{ position: 'relative' }}>
      <Button kind="primary" onClick={() => setIsMounted(!isMounted)}>
        Toggle
      </Button>
      {isReallyMounted && (
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
              animation: `${spinAnimation} 1.4s infinite linear`
            }
          }}
          {...transitionProps}
        />
      )}
    </Box>
  );
};
