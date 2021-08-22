/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Containers/Box'
} as Meta;

export const Basics = () => <Box>Sample text</Box>;

export const Blueprint = createBlueprint('box');
