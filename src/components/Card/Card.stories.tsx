/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { Meta } from '@storybook/react';
import { Card, CardBody, CardFooter, CardHeader } from 'src';
import { createBlueprint } from 'storybook/utils';
import { compact } from 'storybook/decorators';

export default {
  title: 'Containers/Card',
  decorators: [compact()],
  parameters: {
    backgrounds: { default: 'lightGrey' }
  }
} as Meta;

export const Basics = () => <Card sx={{ padding: '1em' }}>Lorem ipsum</Card>;

export const ContentParts = () => (
  <Card>
    <CardHeader>Header</CardHeader>
    <CardBody>Body</CardBody>
    <CardFooter>Footer</CardFooter>
  </Card>
);

export const Blueprint = createBlueprint('card');
