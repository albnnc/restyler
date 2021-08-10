/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { Meta } from '@storybook/react';
import { TabGroup, TabOption, useTabManager } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Navigation/Tabs'
} as Meta;

export const Basics = () => {
  const manager = useTabManager('A');
  return (
    <TabGroup manager={manager}>
      <TabOption id="A">Tab A</TabOption>
      <TabOption id="B">Tab B</TabOption>
      <TabOption id="C">Tab C</TabOption>
    </TabGroup>
  );
};

export const blueprint = createBlueprint('tab', { muted: /^tab$/ });
