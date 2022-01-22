/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { Checkbox } from 'lib';
import { createBlueprint } from 'docs/utils';

export default {
  title: 'Forms/Checkbox'
} as Meta;

export const Basics = () => {
  const [value, setValue] = useState(false);
  return (
    <Checkbox value={value} onChange={v => setValue(v)}>
      Sample checkbox
    </Checkbox>
  );
};

export const Blueprint = createBlueprint('checkbox');
