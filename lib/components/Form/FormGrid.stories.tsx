/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from 'docs/decorators';
import { createBlueprint } from 'docs/utils';
import { Button, Form, FormField, FormGrid } from 'lib';

export default {
  title: 'Forms/FormGrid',
  decorators: [compact('700px')]
} as Meta;

export const Basics = () => (
  <Form>
    <FormGrid>
      <FormField label="a" name="a" />
      <FormField label="b" name="b" />
      <FormField label="c" name="c" />
      <FormField label="d" name="d" />
    </FormGrid>
    <Button kind="primary" sx={{ mt: 3 }}>
      Submit
    </Button>
  </Form>
);

export const Blueprint = createBlueprint('form.grid');
