import React from 'react';
import { Button, Form, FormField, FormGrid } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'forms/FormGrid'
};

export const Basics = () => (
  <Form css={{ width: '100%', maxWidth: '700px' }}>
    <FormGrid>
      <FormField name="a" label="a" />
      <FormField name="b" label="b" />
      <FormField name="c" label="c" />
      <FormField name="d" label="d" />
    </FormGrid>
    <Button kind="primary" margin={{ top: 'medium' }}>
      Submit
    </Button>
  </Form>
);

export const Blueprint = createBlueprint('form.grid');
