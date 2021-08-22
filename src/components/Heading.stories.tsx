/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box, Heading } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'General/Heading'
} as Meta;

export const Basics = () => {
  return (
    <Box>
      <Heading kind="1">Heading 1</Heading>
      <Heading kind="2">Heading 2</Heading>
      <Heading kind="3">Heading 3</Heading>
      <Heading kind="4">Heading 4</Heading>
      <Heading kind="5">Heading 5</Heading>
      <Heading kind="6">Heading 6</Heading>
    </Box>
  );
};

export const Blueprint = createBlueprint('heading');
