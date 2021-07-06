import { Meta } from '@storybook/react';
import React from 'react';
import { Select, SelectOption } from 'src';
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

export const Blueprint = createBlueprint('select');
