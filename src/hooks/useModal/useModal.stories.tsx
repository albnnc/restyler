/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import {
  Button,
  Form,
  FormField,
  FormGrid,
  Heading,
  ModalBody,
  Select,
  SelectOption,
  useModal
} from 'src';
import { ModalFooter, ModalHeader } from 'src/components';

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
            <ModalBody>
              <Button kind="secondary" onClick={handleClose}>
                Close
              </Button>
            </ModalBody>
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
          content: 'Are you sure you want to continue?'
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
              <ModalHeader>
                <Heading kind="modal">Let's leave feedback</Heading>
              </ModalHeader>
              <ModalBody>
                <FormGrid>
                  <FormField label="Username" name="username">
                    <Select>
                      <SelectOption value="admin" />
                      <SelectOption value="guest" />
                    </Select>
                  </FormField>
                  <FormField label="Email" name="email" />
                </FormGrid>
              </ModalBody>
              <ModalFooter>
                <Button kind="secondary" type="submit" onClick={handleClose}>
                  Cancel
                </Button>
                <Button kind="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </Form>
          )
        })
      }
    >
      Open
    </Button>
  );
};
