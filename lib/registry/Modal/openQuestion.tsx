import React, { ReactNode } from 'react';
import { TransitionRendererProps } from '../../utils';
import { ModalOptions } from './openModal';

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

export const createOpenQuestion = ({ registry, locale }) => ({
  cancelText,
  confirmText,
  content,
  heading,
  onClose,
  render,
  ...rest
}: QuestionOptions) =>
  new Promise(resolve => {
    const { Box, Button, Heading, openModal } = registry;
    let result = false;
    openModal({
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
