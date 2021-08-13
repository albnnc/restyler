/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { File } from 'src';
import { compact } from 'storybook/decorators';
import { createBlueprint } from 'storybook/utils';

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
