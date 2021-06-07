import { Meta } from '@storybook/react';
import React, { Fragment } from 'react';
import { File } from 'src';
import { blueprinted } from 'storybook/decorators';

export default {
  title: 'forms/File'
} as Meta;

export const Blueprint = () => {
  return (
    <File>
      <Fragment />
    </File>
  );
};
Blueprint.decorators = [blueprinted];

export const Basics = () => {
  return (
    <File css={{ width: '300px' }}>
      {names => (names.length > 0 ? names.join(', ') : 'Select File')}
    </File>
  );
};
