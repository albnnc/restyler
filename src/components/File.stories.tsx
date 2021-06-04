import { Meta } from '@storybook/react';
import React from 'react';
import { File } from 'src';

export default {
  title: 'forms/File'
} as Meta;

export const Basics = () => {
  return (
    <File css={{ width: '300px' }}>
      {names => (names.length > 0 ? names.join(', ') : 'Select File')}
    </File>
  );
};
