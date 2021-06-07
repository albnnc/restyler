import React, { useState } from 'react';
import { Box, Button, Collapse } from 'src';
import { blueprinted } from 'storybook/decorators';

export default {
  title: 'containers/Collapse'
};

export const Blueprint = () => {
  return <Collapse isOpen />;
};
Blueprint.decorators = [blueprinted];

export const Basics = ({ isPersistent }) => {
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
      <Collapse isPersistent={isPersistent} isOpen={isOpen}>
        <Box background="primary" css={{ height: '100px' }} />
      </Collapse>
    </Box>
  );
};
Basics.args = {
  isPersistent: false
};
