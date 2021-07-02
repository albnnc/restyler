import React from 'react';
import { Button, Form, FormField } from 'src';
import { createBlueprint } from 'storybook/utils';

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

export const Blueprint = createBlueprint('form', {
  exclude: /form\.field\..+/
});
