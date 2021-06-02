import { Box, Button, Form, FormField, FormRow } from 'docs/components/shared';
import React from 'react';

export const RowDemo = () => (
  <Form>
    <FormRow>
      <FormField name="a" label="Field A" />
      <FormField name="b" label="Field B" />
      <FormField name="c" label="Field C" />
      <FormField name="d" label="Field D" />
      <FormField name="e" label="Field E" />
      <FormField name="f" label="Field F" />
    </FormRow>
    <Button type="submit" kind="primary" margin={{ top: 'medium' }}>
      Submit
    </Button>
  </Form>
);
