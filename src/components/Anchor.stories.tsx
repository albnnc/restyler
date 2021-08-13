/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Anchor } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Navigation/Anchor'
} as Meta;

export const Basics = () => {
  return <Anchor>Anchor text</Anchor>;
};

export const Blueprint = createBlueprint('anchor');
