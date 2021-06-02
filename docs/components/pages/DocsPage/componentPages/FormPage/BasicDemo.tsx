import {
  Box,
  Button,
  Checkbox,
  File,
  Form,
  FormField,
  Input,
  RadioGroup,
  RadioOption,
  Select,
  SelectOption,
  TextArea
} from 'docs/components/shared';
import { useFormManager } from 'lib';
import { Fragment } from 'react';

export const BasicDemo = () => {
  const manager = useFormManager();
  return (
    <Fragment>
      <Form manager={manager} kind="vertical">
        <FormField required name="login" label="Login" />
        <FormField
          required
          name="password"
          label="Password"
          help="At least 8 characters"
          validate={v => (v?.length < 8 ? ['Wrong format'] : [])}
        >
          <Input type="password" />
        </FormField>
        <FormField required name="authType" label="Auth type" disabled>
          <Select>
            <SelectOption value="auth-type-1">OAuth</SelectOption>
            <SelectOption value="auth-type-2">LDAP</SelectOption>
          </Select>
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
        <FormField name="cert" label="Certificate">
          <File />
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
    </Fragment>
  );
};
