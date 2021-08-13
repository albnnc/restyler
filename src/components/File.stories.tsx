/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { Meta } from '@storybook/react';
import { File } from 'src';
import { createBlueprint } from 'storybook/utils';
import { compact } from 'storybook/decorators';

export default {
  title: 'Forms/File',
  decorators: [compact('300px')]
} as Meta;

export const Basics = () => {
  return (
    <File>
      {names => (names.length > 0 ? names.join(', ') : 'Select File')}
    </File>
  );
};

export const Blueprint = createBlueprint('file');
