/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Button, Form, FormField } from 'src';
import { compact } from 'storybook/decorators';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Forms/Form',
  decorators: [compact()]
} as Meta;

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
