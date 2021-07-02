import React, { useMemo, useState } from 'react';
import { Box, Button, Collapse } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'containers/Collapse'
};

export const Basics = () => {
  const [isOpen, setIsOpen] = useState(false);
  const content = useMemo(
    () => <Box background="primary" css={{ height: '100px' }} />,
    []
  );
  return (
    <Box css={{ width: '200px' }}>
      <Button
        kind="primary"
        margin={{ bottom: 'medium' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        Toggle
      </Button>
      <Collapse isOpen={isOpen}>{content}</Collapse>
    </Box>
  );
};

export const Blueprint = createBlueprint('collapse');
