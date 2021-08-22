/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Button } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'General/Button'
} as Meta;

export const Basics = () => <Button kind="primary">Action</Button>;

export const Blueprint = createBlueprint('button');
