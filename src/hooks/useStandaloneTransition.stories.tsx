import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import { Box, Button, useStandaloneTransition } from 'src';

export default {
  title: 'hooks/useStandaloneTransition'
} as Meta;

export const Basics = () => {
  const open = useStandaloneTransition<HTMLDivElement>(
    ({ isVisible }, ref) => (
      <Box
        ref={ref}
        css={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          width: '3rem',
          height: '3rem',
          background: 'red',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s'
        }}
      />
    ),
    {
      deps: []
    }
  );
  const [close, setClose] = useState<() => void>();
  const openAndUpdate = () => {
    const close = open();
    setClose(() => () => {
      close();
      setClose(undefined);
    });
  };
  return (
    <Box css={{ position: 'relative' }}>
      <Button kind="primary" onClick={close ?? openAndUpdate}>
        Toggle
      </Button>
    </Box>
  );
};
