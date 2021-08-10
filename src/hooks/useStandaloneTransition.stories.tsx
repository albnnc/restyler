/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { Meta } from '@storybook/react';
import { useState } from 'react';
import { Box, Button, useStandaloneTransition } from 'src';

export default {
  title: 'hooks/useStandaloneTransition'
} as Meta;

export const Basics = () => {
  const open = useStandaloneTransition<HTMLDivElement>(
    ({ isVisible }, ref) => (
      <Box
        ref={ref}
        sx={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          width: '50px',
          height: '50px',
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
    <Button kind="primary" onClick={close ?? openAndUpdate}>
      Toggle
    </Button>
  );
};
