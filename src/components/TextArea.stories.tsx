/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { TextArea } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Forms/TextArea'
} as Meta;

export const Basics = () => {
  const [value, setValue] = useState('');
  return (
    <TextArea
      sx={{ maxWidth: '300px' }}
      value={value}
      onChange={v => setValue(v)}
    />
  );
};

export const blueprint = createBlueprint('textArea');
