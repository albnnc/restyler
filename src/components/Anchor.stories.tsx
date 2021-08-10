import React from 'react';
import { Anchor } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Navigation/Anchor'
};

export const Basics = () => {
  return <Anchor>Anchor text</Anchor>;
};

export const Blueprint = createBlueprint('anchor');
