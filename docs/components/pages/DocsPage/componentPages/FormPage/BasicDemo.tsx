import {
  Box,
  Button,
  Checkbox,
  Form,
  FormField,
  Input,
  RadioGroup,
  RadioOption,
  Select,
  TextArea
} from 'docs/components/shared';
import { useFormManager } from 'lib';
import React from 'react';

export const BasicDemo = () => {
  const manager = useFormManager();
  return (
    <>
      <Form manager={manager} kind="vertical">
        <FormField required name="login" label="Login" />
        <FormField required name="password" label="Password">
          <Input type="password" />
        </FormField>
        <FormField required name="authType" label="Auth type">
          <Select options={[{ value: 'OAuth' }, { value: 'LDAP' }]} />
        </FormField>
        <FormField name="remember">
          <Checkbox>Remember me</Checkbox>
        </FormField>
        <FormField name="other" label="Other">
          <RadioGroup>
            <RadioOption value={true}>A</RadioOption>
            <RadioOption value={false}>B</RadioOption>
          </RadioGroup>
        </FormField>
        <FormField name="address" label="Address">
          <TextArea />
        </FormField>
        <Button type="submit" kind="primary" margin={{ top: 'medium' }}>
          Submit
        </Button>
      </Form>
      <Box margin={{ top: 'larger' }}>
        <Box>Form values</Box>
        <pre>
          <code>{JSON.stringify(manager.values, null, 2)}</code>
        </pre>
      </Box>
      <Box margin={{ top: 'larger' }}>
        <Box>Form errors</Box>
        <pre>
          <code>{JSON.stringify(manager.errors, null, 2)}</code>
        </pre>
      </Box>
    </>
  );
};
