/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { createBlueprint } from 'docs/utils';
import { Anchor } from 'lib';

export default {
  title: 'Navigation/Anchor'
} as Meta;

export const Basics = () => {
  return <Anchor>Anchor text</Anchor>;
};

export const Blueprint = createBlueprint('anchor');
