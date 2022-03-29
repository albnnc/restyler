/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from 'docs/decorators';
import { Inputable } from './Inputable';
import { InputableChip } from './InputableChip';

export default {
  title: 'Forms/Inputable',
  decorators: [compact('300px')]
} as Meta;

export const Basics = () => {
  return (
    <Inputable>
      <InputableChip>One</InputableChip>
      <InputableChip kind="removable">Two</InputableChip>
    </Inputable>
  );
};
