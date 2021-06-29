import React, { Fragment, ReactNode, useCallback, useContext } from 'react';
import { Box, Button, Heading, SystemContext } from '../../components';
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
        {heading && <Heading>{heading}</Heading>}
        {content && <Box margin={{ top: 'medium' }}>{content}</Box>}
        <Box direction="row" justify="end" margin={{ top: 'medium' }}>
          <Button kind="secondary" onClick={() => handleClose(false)}>
            {cancelText ?? locale.cancel}
          </Button>
          <Button
            kind="primary"
            margin={{ left: 'small' }}
            onClick={() => handleClose(true)}
          >
            {okText ?? locale.ok}
          </Button>
        </Box>
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
