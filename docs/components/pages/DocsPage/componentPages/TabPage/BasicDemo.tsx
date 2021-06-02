import React from 'react';
import { TabGroup, TabOption } from '~docs/components/shared';
import { useTabManager } from '~lib/hooks';

export const BasicDemo = () => {
  const manager = useTabManager('a');
  return (
    <TabGroup manager={manager}>
      <TabOption id="a">Tab A</TabOption>
      <TabOption id="b">Tab B</TabOption>
      <TabOption id="c">Tab C</TabOption>
      <TabOption id="d">Tab D</TabOption>
    </TabGroup>
  );
};
