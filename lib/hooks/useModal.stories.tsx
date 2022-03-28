/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import {
  Button,
  Form,
  FormField,
  FormGrid,
  Heading,
  ModalBody,
  Select,
  SelectOption,
  useModal,
  ModalFooter,
  ModalHeader,
  Input
} from 'lib';

export default {
  title: 'hooks/useModal'
} as Meta;

export const Basics = () => {
  const openModal = useModal(
    ({ handleClose }) => (
      <ModalBody>
        <Button kind="secondary" onClick={handleClose}>
          Close
        </Button>
      </ModalBody>
    ),
    {
      deps: [],
      kind: 'primary'
    }
  );
  return (
    <Button kind="primary" onClick={() => openModal()}>
      Open
    </Button>
  );
};

export const WithForm = () => {
  const openModal = useModal(
    ({ handleClose }) => (
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
    ),
    {
      deps: []
    }
  );
  return (
    <Button kind="primary" onClick={() => openModal()}>
      Open
    </Button>
  );
};
