/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { PairList } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Data/PairList'
} as Meta;

export const Basics = () => {
  return (
    <PairList
      pairs={[
        [1, 2],
        [3, 4]
      ]}
    />
  );
};

export const Blueprint = createBlueprint('scroll');
