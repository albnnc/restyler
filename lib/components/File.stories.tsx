/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from 'docs/decorators';
import { createBlueprint } from 'docs/utils';
import { File } from 'lib';

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
