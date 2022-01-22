/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { createBlueprint } from 'docs/utils';
import { Box } from 'lib';

export default {
  title: 'Containers/Box'
} as Meta;

export const Basics = () => <Box>Sample text</Box>;

export const Blueprint = createBlueprint('box');
