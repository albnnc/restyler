import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  FormRow,
  Heading,
  Select,
  SelectOption,
  useModal
} from 'src';

export default {
  title: 'hooks/useModal'
} as Meta;

export const Basics = () => {
  const { openModal } = useModal();
  return (
    <Button
      kind="primary"
      onClick={() => {
        openModal({
          kind: 'small',
          render: ({ handleClose }) => (
            <Box>
              <Button kind="secondary" onClick={handleClose}>
                Close
              </Button>
            </Box>
          )
        });
      }}
    >
      Open
    </Button>
  );
};

export const Question = () => {
  const [answer, setAnswer] = useState<string>('');
  const { openQuestion } = useModal();
  return (
    <Button
      kind="primary"
      onClick={async () => {
        const isOk = await openQuestion({
          heading: 'Important question',
          content: 'Are you sure?'
        });
        setAnswer(isOk ? '(yes)' : '(no)');
      }}
    >
      Open {answer}
    </Button>
  );
};

export const WithForm = () => {
  const { openModal } = useModal();
  return (
    <Button
      kind="primary"
      onClick={() =>
        openModal({
          render: ({ handleClose }) => (
            <Form onSubmit={handleClose}>
              <Heading kind="4">Let's leave feedback</Heading>
              <FormRow margin={{ top: 'medium' }}>
                <FormField name="username" label="Username">
                  <Select>
                    <SelectOption value="admin" />
                    <SelectOption value="guest" />
                  </Select>
                </FormField>
                <FormField name="email" label="Email" />
              </FormRow>
              <Box direction="row" justify="end" margin={{ top: 'medium' }}>
                <Button type="submit" kind="primary">
                  Submit
                </Button>
              </Box>
            </Form>
          )
        })
      }
    >
      Open
    </Button>
  );
};
