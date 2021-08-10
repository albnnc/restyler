/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { Meta } from '@storybook/react';
import { useReducer } from 'react';
import { Box, Button, Select, SelectOption } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Forms/Select'
} as Meta;

export const Basics = () => {
  return (
    <Select placeholder="Select value" sx={{ width: '300px' }}>
      <SelectOption value="a">A</SelectOption>
      <SelectOption value="b">B</SelectOption>
      <SelectOption value="c">C</SelectOption>
    </Select>
  );
};

export const MultipleOptions = () => {
  return (
    <Select isMultiple placeholder="Select values" sx={{ width: '300px' }}>
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
      <Select value={value} sx={{ width: '300px' }}>
        <SelectOption value={0}>A</SelectOption>
        <SelectOption value={1}>B</SelectOption>
        <SelectOption value={2}>C</SelectOption>
      </Select>
    </Box>
  );
};

export const Empty = () => {
  return (
    <Select placeholder="Select value" sx={{ width: '300px' }}>
      {[]}
    </Select>
  );
};

export const Blueprint = createBlueprint('select');
