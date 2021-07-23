import { Meta } from '@storybook/react';
import React, { useReducer } from 'react';
import { Box, Button, Select, SelectOption } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'forms/Select'
} as Meta;

export const Basics = () => {
  return (
    <Select placeholder="Select value" css={{ width: '300px' }}>
      <SelectOption value="a">A</SelectOption>
      <SelectOption value="b">B</SelectOption>
      <SelectOption value="c">C</SelectOption>
    </Select>
  );
};

export const MultipleOptions = () => {
  return (
    <Select isMultiple placeholder="Select values" css={{ width: '300px' }}>
      <SelectOption value="a">A</SelectOption>
      <SelectOption value="b">B</SelectOption>
      <SelectOption value="c">C</SelectOption>
    </Select>
  );
};

export const Controlled = () => {
  const [value, toggle] = useReducer(v => (v + 1) % 3, 0);
  return (
    <Box direction="column" align="start">
      <Button kind="primary" margin={{ bottom: 'medium' }} onClick={toggle}>
        Toggle
      </Button>
      <Select value={value} css={{ width: '300px' }}>
        <SelectOption value={0}>A</SelectOption>
        <SelectOption value={1}>B</SelectOption>
        <SelectOption value={2}>C</SelectOption>
      </Select>
    </Box>
  );
};

export const Empty = () => {
  return (
    <Select placeholder="Select value" css={{ width: '300px' }}>
      {[]}
    </Select>
  );
};

export const Blueprint = createBlueprint('select');
