import React, { Fragment, ReactNode, useCallback, useContext } from 'react';
import {
  Heading,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  SystemContext
} from '../../components';
import { StandaloneTransitionerProps } from '../useStandaloneTransition';
import {
  ModalOptions,
  ModalRendererProps,
  useModalOpener
} from './useModalOpener';

export interface QuestionRendererProps
  extends Omit<StandaloneTransitionerProps, 'handleClose'> {
  handleClose: (output: boolean) => void;
}

export interface QuestionOptions extends Omit<ModalOptions, 'render'> {
  okText?: string;
  cancelText?: string;
  content?: ReactNode;
  heading?: ReactNode;
  render?: (props: QuestionRendererProps) => ReactNode;
}

export const useQuestionOpener = () => {
  const { locale } = useContext(SystemContext);
  const openModal = useModalOpener();
  const renderDefaults = useCallback(
    (
      { handleClose }: QuestionRendererProps,
      { cancelText, okText, content, heading }: QuestionOptions
    ) => (
      <Fragment>
        {heading && (
          <ModalHeader>
            <Heading>{heading}</Heading>
          </ModalHeader>
        )}
        {content && <ModalBody>{content}</ModalBody>}
        <ModalFooter>
          <Button kind="secondary" onClick={() => handleClose(false)}>
            {cancelText ?? locale.cancel}
          </Button>
          <Button kind="primary" onClick={() => handleClose(true)}>
            {okText ?? locale.ok}
          </Button>
        </ModalFooter>
      </Fragment>
    ),
    []
  );
  return useCallback(
    (options: QuestionOptions) => {
      const { render, ...rest } = options;
      return new Promise<boolean>(resolve => {
        let output = false;
        openModal({
          kind: 'question',
          onClose: () => resolve(output),
          render: ({ handleClose, ...rest }: ModalRendererProps) => {
            const props = {
              handleClose: (v: boolean) => {
                output = v;
                handleClose();
              },
              ...rest
            };
            return render?.(props) ?? renderDefaults(props, options);
          },
          ...rest
        });
      });
    },
    [openModal, renderDefaults]
  );
};
