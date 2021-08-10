/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { Button, Form, FormField, FormGrid } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Forms/FormGrid'
};

export const Basics = () => (
  <Form sx={{ width: '100%', maxWidth: '700px' }}>
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
