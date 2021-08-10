/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { Button, Form, FormField } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Forms/Form'
};

export const Basics = () => {
  return (
    <Form>
      <FormField required name="username" label="Username" />
      <Button type="submit" kind="primary" sx={{ mt: 3 }}>
        Submit
      </Button>
    </Form>
  );
};

export const Blueprint = createBlueprint('form', {
  exclude: /form\.field\..+/
});
