import {
  Box,
  Button,
  Form,
  FormField,
  Input,
  RadioGroup,
  RadioOption,
  Select
} from 'docs/components/shared';
import { useFormManager } from 'lib';
import React from 'react';

export const BasicDemo = () => {
  const manager = useFormManager();
  return (
    <>
      <Form manager={manager}>
        <FormField required name="login" label="Login" />
        <FormField required name="password" label="Password">
          <Input type="password" />
        </FormField>
        <FormField required name="authType" label="Auth type">
          <Select options={[{ value: 'OAuth' }, { value: 'LDAP' }]} />
        </FormField>
        <FormField name="remember" label="Remember me">
          <RadioGroup>
            <RadioOption value={true}>Yes</RadioOption>
            <RadioOption value={false}>No</RadioOption>
          </RadioGroup>
        </FormField>
        <Button type="submit" kind="primary" margin={{ top: 'medium' }}>
          Submit
        </Button>
      </Form>
      <Box margin={{ top: 'x-large' }}>
        <Box>Form values</Box>
        <pre>
          <code>{JSON.stringify(manager.values, null, 2)}</code>
        </pre>
      </Box>
      <Box margin={{ top: 'x-large' }}>
        <Box>Form errors</Box>
        <pre>
          <code>{JSON.stringify(manager.errors, null, 2)}</code>
        </pre>
      </Box>
    </>
  );
};
