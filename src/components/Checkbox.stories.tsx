/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { Checkbox } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Forms/Checkbox'
};

export const Basics = () => {
  const [value, setValue] = useState(false);
  return (
    <Checkbox value={value} onChange={v => setValue(v)}>
      Sample checkbox
    </Checkbox>
  );
};

export const Blueprint = createBlueprint('checkbox');
