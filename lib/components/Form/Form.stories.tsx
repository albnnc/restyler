/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Form,
  FormField,
  FormGrid,
  Input,
  Select,
  SelectOption,
  useFormManager,
  File,
  RadioGroup,
  RadioOption,
  TextArea
} from 'lib';
import { compact } from 'docs/decorators';
import { createBlueprint } from 'docs/utils';

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

export const Disabling = () => {
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Checkbox value={disabled} onChange={setDisabled}>
          Disabled
        </Checkbox>
        <Checkbox value={readOnly} onChange={setReadOnly}>
          ReadOnly
        </Checkbox>
      </Box>
      <Form disabled={disabled} readOnly={readOnly}>
        <FormGrid>
          <FormField label="A" name="a" />
          <FormField label="A" name="b">
            <Select isMultiple>
              <SelectOption value="a1">a1</SelectOption>
              <SelectOption value="a2">a2</SelectOption>
              <SelectOption value="a3">a3</SelectOption>
            </Select>
          </FormField>
          <FormField name="c">
            <Checkbox>C</Checkbox>
          </FormField>
          <FormField label="D" name="d">
            <File />
          </FormField>
          <FormField label="E" name="e">
            <RadioGroup>
              <RadioOption value="A">Option A</RadioOption>
              <RadioOption value="B">Option B</RadioOption>
              <RadioOption value="C">Option C</RadioOption>
            </RadioGroup>
          </FormField>
          <FormField label="F" name="f">
            <TextArea />
          </FormField>
        </FormGrid>
      </Form>
    </Box>
  );
};

export const TwoMultiselects = () => {
  return (
    <Form>
      <FormGrid>
        <FormField label="A" name="a">
          <Select isMultiple>
            <SelectOption value="a1">a1</SelectOption>
            <SelectOption value="a2">a2</SelectOption>
            <SelectOption value="a3">a3</SelectOption>
          </Select>
        </FormField>
        <FormField label="B" name="b">
          <Select isMultiple>
            <SelectOption value="b1">b1</SelectOption>
            <SelectOption value="b2">b2</SelectOption>
          </Select>
        </FormField>
      </FormGrid>
    </Form>
  );
};

export const Blueprint = createBlueprint('form', {
  exclude: /form\.field\..+/
});
