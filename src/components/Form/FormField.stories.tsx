import React, { Fragment } from 'react';
import { FormField } from 'src';
import { blueprinted } from 'storybook/decorators';

export default {
  title: 'forms/FormField'
};

export const Blueprint = () => {
  return (
    <FormField name="_" label="_" help="_">
      <Fragment />
    </FormField>
  );
};
Blueprint.decorators = [blueprinted];
