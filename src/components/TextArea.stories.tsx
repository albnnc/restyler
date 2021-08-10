/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { Meta } from '@storybook/react';
import { useState } from 'react';
import { createBlueprint } from 'storybook/utils';
import { TextArea } from 'src';

export default {
  title: 'Forms/TextArea'
} as Meta;

export const Basics = () => {
  const [value, setValue] = useState('');
  return (
    <TextArea
      value={value}
      onChange={v => setValue(v)}
      sx={{ maxWidth: '300px' }}
    />
  );
};

export const blueprint = createBlueprint('textArea');
