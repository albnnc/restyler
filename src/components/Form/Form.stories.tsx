import React from 'react';
import { Button, Form, FormField } from 'src';

export default {
  title: 'forms/Form'
};

export const Basics = () => {
  return (
    <Form>
      <FormField required name="username" label="Username" />
      <Button type="submit" kind="primary" margin={{ top: 'medium' }}>
        Submit
      </Button>
    </Form>
  );
};
