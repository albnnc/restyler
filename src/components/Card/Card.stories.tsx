import { Meta } from '@storybook/react';
import React from 'react';
import { Card, CardBody, CardFooter, CardHeader } from 'src';
import { blueprinted } from 'storybook/decorators';

export default {
  title: 'containers/Card',
  parameters: {
    backgrounds: { default: 'lightGrey' }
  }
} as Meta;

export const Blueprint = () => {
  return (
    <Card>
      <CardHeader />
      <CardBody />
      <CardFooter />
    </Card>
  );
};
Blueprint.decorators = [blueprinted];
Blueprint.parameters = { backgrounds: { default: 'white' } };

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
