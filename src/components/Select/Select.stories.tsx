/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useReducer } from 'react';
import { Box, Button, Select, SelectOption } from 'src';
import { compact } from 'storybook/decorators';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Forms/Select',
  decorators: [compact('300px')]
} as Meta;

export const Basics = () => {
  return (
    <Select placeholder="Select value">
      <SelectOption value="a">A</SelectOption>
      <SelectOption value="b">B</SelectOption>
      <SelectOption value="c">C</SelectOption>
    </Select>
  );
};

export const MultipleOptions = () => {
  return (
    <Select isMultiple placeholder="Select values">
      <SelectOption value="a">A</SelectOption>
      <SelectOption value="b">B</SelectOption>
      <SelectOption value="c">C</SelectOption>
    </Select>
  );
};

export const Controlled = () => {
  const [value, toggle] = useReducer(v => (v + 1) % 3, 0);
  return (
    <Box>
      <Button kind="primary" sx={{ mb: 3 }} onClick={toggle}>
        Toggle
      </Button>
      <Select value={value}>
        <SelectOption value={0}>A</SelectOption>
        <SelectOption value={1}>B</SelectOption>
        <SelectOption value={2}>C</SelectOption>
      </Select>
    </Box>
  );
};

export const Empty = () => {
  return <Select placeholder="Select value">{[]}</Select>;
};

export const Blueprint = createBlueprint('select');
