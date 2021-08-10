/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { useMemo, useState } from 'react';
import { Box, Button, Collapse } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Containers/Collapse'
};

export const Basics = () => {
  const [isOpen, setIsOpen] = useState(false);
  const content = useMemo(
    () => <Box sx={{ height: '100px', mt: 2, bg: 'primary' }} />,
    []
  );
  return (
    <Box css={{ width: '200px' }}>
      <Button kind="primary" onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </Button>
      <Collapse isOpen={isOpen}>{content}</Collapse>
    </Box>
  );
};

export const Blueprint = createBlueprint('collapse');
