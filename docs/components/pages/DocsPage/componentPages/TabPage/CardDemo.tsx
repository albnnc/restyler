import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  TabGroup,
  TabOption
} from '~docs/components/shared';
import { useTabManager } from '~lib/hooks';

export const CardDemo = () => {
  const manager = useTabManager('a');
  return (
    <Card>
      <CardHeader border={{ bottom: 'rgba(0, 0, 0, 0.15)' }}>
        <TabGroup manager={manager}>
          <TabOption id="a">Tab A</TabOption>
          <TabOption id="b">Tab B</TabOption>
          <TabOption id="c">Tab C</TabOption>
        </TabGroup>
      </CardHeader>
      <CardBody>
        {
          {
            a: 'Content A',
            b: 'Content B',
            c: 'Content C'
          }[manager.activeId]
        }
      </CardBody>
    </Card>
  );
};
