/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { createBlueprint } from 'docs/utils';
import { TabGroup, TabOption, useTabManager } from 'lib';

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
