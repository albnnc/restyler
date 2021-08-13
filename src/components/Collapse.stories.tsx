/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useMemo, useState } from 'react';
import { Box, Button, Collapse } from 'src';
import { compact } from 'storybook/decorators';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Containers/Collapse',
  decorators: [compact()]
} as Meta;

export const Basics = () => {
  const [isOpen, setIsOpen] = useState(false);
  const content = useMemo(
    () => (
      <Box
        sx={{
          marginTop: 2,
          height: '100px',
          backgroundColor: 'primary'
        }}
      />
    ),
    []
  );
  return (
    <Box>
      <Button kind="primary" onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </Button>
      <Collapse isOpen={isOpen}>{content}</Collapse>
    </Box>
  );
};

export const Blueprint = createBlueprint('collapse');
