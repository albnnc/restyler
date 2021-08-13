/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Button, Form, FormField, FormGrid } from 'src';
import { compact } from 'storybook/decorators';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Forms/FormGrid',
  decorators: [compact('700px')]
} as Meta;

export const Basics = () => (
  <Form>
    <FormGrid>
      <FormField name="a" label="a" />
      <FormField name="b" label="b" />
      <FormField name="c" label="c" />
      <FormField name="d" label="d" />
    </FormGrid>
    <Button kind="primary" sx={{ mt: 3 }}>
      Submit
    </Button>
  </Form>
);

export const Blueprint = createBlueprint('form.grid');
