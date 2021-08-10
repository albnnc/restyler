import { Meta } from '@storybook/react';
import React from 'react';
import { Card, CardBody, CardFooter, CardHeader } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Containers/Card',
  parameters: {
    backgrounds: { default: 'lightGrey' }
  }
} as Meta;

export const Basics = () => {
  return <Card>Lorem ipsum</Card>;
};

export const ContentParts = () => {
  return (
    <Card css={{ width: '300px' }}>
      <CardHeader>Header</CardHeader>
      <CardBody>Body</CardBody>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
};

export const Blueprint = createBlueprint('card');
