import React, { useState } from 'react';
import { Box, Button, Collapse } from 'src';

export default {
  title: 'containers/Collapse'
};

export const Basics = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box css={{ width: '200px' }}>
      <Button
        kind="primary"
        margin={{ bottom: 'medium' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        Toggle
      </Button>
      <Collapse isOpen={isOpen}>
        <Box background="primary" css={{ height: '100px' }} />
      </Collapse>
    </Box>
  );
};
