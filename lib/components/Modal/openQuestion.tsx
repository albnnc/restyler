import React, { ReactNode } from 'react';
import { System } from '../../models';
import { TransitionRendererProps } from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { openModal, ModalOptions } from './openModal';

export interface QuestionRendererProps extends TransitionRendererProps {
  resolve: (result: boolean) => void;
}

export interface QuestionRenderer {
  (props: QuestionRendererProps): ReactNode;
}

export interface QuestionOptions extends Omit<ModalOptions, 'render'> {
  cancelText?: string;
  confirmText?: string;
  content?: ReactNode;
  heading?: ReactNode;
  render?: QuestionRenderer;
}

export const openQuestion = (options: { system: System } & QuestionOptions) => {
  const {
    system,
    cancelText,
    confirmText,
    content,
    heading,
    onClose,
    render,
    ...rest
  } = {
    ...options.system.defaults?.questionOptions,
    ...options
  };
  return new Promise(resolve => {
    let result = false;
    const { locale } = system;
    openModal({
      system,
      kind: 'question',
      onClose: () => {
        onClose?.();
        resolve(result);
      },
      render: render
        ? (props: TransitionRendererProps) => render({ ...props, resolve })
        : (props: TransitionRendererProps) => (
            <>
              {heading && <Heading>{heading}</Heading>}
              {content && <Box margin={{ top: 'medium' }}>{content}</Box>}
              <Box direction="row" justify="end" margin={{ top: 'medium' }}>
                <Button
                  kind="primary"
                  border={{ style: 'dashed' }}
                  onClick={props.handleClose}
                >
                  {cancelText ?? locale.cancelText}
                </Button>
                <Button
                  kind="primary"
                  margin={{ left: 'small' }}
                  onClick={() => {
                    result = true;
                    props.handleClose();
                  }}
                >
                  {confirmText ?? locale.confirmText}
                </Button>
              </Box>
            </>
          ),
      ...rest
    });
  });
};
