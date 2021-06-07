import React, { Fragment } from 'react';
import { Button, Form, FormField } from 'src';
import { blueprinted } from 'storybook/decorators';

export default {
  title: 'forms/Form'
};

export const Blueprint = () => {
  return <Form />;
};
Blueprint.decorators = [blueprinted];

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
