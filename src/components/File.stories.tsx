/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { Meta } from '@storybook/react';
import { File } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Forms/File'
} as Meta;

export const Basics = () => {
  return (
    <File sx={{ width: '300px' }}>
      {names => (names.length > 0 ? names.join(', ') : 'Select File')}
    </File>
  );
};

export const Blueprint = createBlueprint('file');
