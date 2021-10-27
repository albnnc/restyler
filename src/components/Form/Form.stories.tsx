/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useCallback, useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  FormField,
  FormGrid,
  Input,
  useFormManager
} from 'src';
import { compact } from 'storybook/decorators';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Forms/Form',
  decorators: [compact()]
} as Meta;

export const Basics = () => {
  return (
    <Form>
      <FormField required label="Username" name="username" />
      <Button kind="primary" sx={{ mt: 3 }} type="submit">
        Submit
      </Button>
    </Form>
  );
};

export const Nesting = () => {
  const [submitCount, setSubmitCount] = useState(0);
  const manager = useFormManager();
  const validatePassword = useCallback(
    (v: string) => (v && v.length > 3 ? [] : ['Too short']),
    []
  );
  return (
    <Form manager={manager} onSubmit={() => setSubmitCount(v => v + 1)}>
      <FormGrid>
        <FormField required label="Username" name="data.username" />
        <FormField name="hasPassword">
          <Checkbox>Change password</Checkbox>
        </FormField>
        {manager.values.hasPassword && (
          <FormField
            required
            label="Password"
            name="data.password"
            validate={validatePassword}
          >
            <Input type="password" />
          </FormField>
        )}
      </FormGrid>
      <Button kind="primary" sx={{ mt: 3 }} type="submit">
        Save
        {submitCount ? ` (${submitCount})` : ''}
      </Button>
    </Form>
  );
};

export const Blueprint = createBlueprint('form', {
  exclude: /form\.field\..+/
});
