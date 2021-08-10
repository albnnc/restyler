/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { Button } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'General/Button'
};

export const Basics = () => {
  return <Button kind="primary">Action</Button>;
};

export const Blueprint = createBlueprint('button');
