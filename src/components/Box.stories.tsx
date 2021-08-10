import React from 'react';
import { Box } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Containers/Box'
};

export const Basics = () => {
  return <Box>Sample text</Box>;
};

export const Blueprint = createBlueprint('box');
