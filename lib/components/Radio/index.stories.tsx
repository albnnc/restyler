/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { RadioGroup, RadioOption } from 'lib';
import { createBlueprint } from 'docs/utils';

export default {
  title: 'Forms/Radio'
} as Meta;

export const Basics = () => {
  const [value, setValue] = useState('A');
  return (
    <RadioGroup value={value} onChange={v => setValue(v)}>
      <RadioOption value="A">Option A</RadioOption>
      <RadioOption value="B">Option B</RadioOption>
      <RadioOption value="C">Option C</RadioOption>
    </RadioGroup>
  );
};

export const blueprint = createBlueprint('radio', { muted: /^radio$/ });
