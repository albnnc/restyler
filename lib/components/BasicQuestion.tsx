import React, { Fragment, ReactNode, useContext } from 'react';
import { Button } from './Button';
import { Heading } from './Heading';
import { ModalBody, ModalFooter, ModalHeader } from './Modal';
import { SystemContext } from './SystemContext';

export interface BasicQuestionProps {
  content: ReactNode;
  heading: ReactNode;
  okText?: string;
  cancelText?: string;
  onClose?: (output: boolean) => void;
}

export const BasicQuestion = ({
  heading,
  content,
  okText,
  cancelText,
  onClose
}: BasicQuestionProps) => {
  const { locale } = useContext(SystemContext);
  return (
    <Fragment>
      {heading && (
        <ModalHeader>
          <Heading kind="modal">{heading}</Heading>
        </ModalHeader>
      )}
      {content && <ModalBody>{content}</ModalBody>}
      <ModalFooter>
        <Button kind="secondary" onClick={() => onClose?.(false)}>
          {cancelText ?? locale.cancel}
        </Button>
        <Button kind="primary" onClick={() => onClose?.(true)}>
          {okText ?? locale.ok}
        </Button>
      </ModalFooter>
    </Fragment>
  );
};

BasicQuestion.displayName = 'BasicQuestion';
