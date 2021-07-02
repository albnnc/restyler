import { Meta } from '@storybook/react';
import React from 'react';
import { Select, SelectOption } from 'src';
import { blueprinted } from 'storybook/decorators';

export default {
  title: 'forms/Select'
} as Meta;

export const Blueprint = () => {
  return (
    <Select>
      <SelectOption value="_" />
    </Select>
  );
};
Blueprint.decorators = [blueprinted];

export const Basics = () => {
  return (
    <Select placeholder="Select value" css={{ width: '300px' }}>
      <SelectOption value="a">A</SelectOption>
      <SelectOption value="b">B</SelectOption>
      <SelectOption value="c">C</SelectOption>
    </Select>
  );
};
