import { Meta } from '@storybook/react';
import React, { useCallback, useContext, useState } from 'react';
import { Box, Button, openTransition } from 'src';
import { SystemContext } from 'src/components';
import {} from './openTransition';

export default {
  title: 'utils/openTransition'
} as Meta;

export const Basics = () => {
  const system = useContext(SystemContext);
  const [handleClick, setHandleClick] = useState(() => () => {
    const close = openTransition(
      ({ isVisible }) => (
        <Box
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
      system
    );
    setHandleClick(() => () => {
      close();
      setHandleClick(() => handleClick);
    });
  });
  return (
    <Box css={{ position: 'relative' }}>
      <Button kind="primary" onClick={handleClick}>
        Toggle
      </Button>
    </Box>
  );
};
