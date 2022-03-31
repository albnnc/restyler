import React, {
  DependencyList,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef
} from 'react';
import { SystemContext, BasicQuestion } from '../components';
import { ImperativePortal } from './useImperativePortal';
import { ModalOptions, useModal } from './useModal';
import { StandaloneTransitionerProps } from './useStandaloneTransition';

export interface QuestionRendererProps<C = never>
  extends Omit<StandaloneTransitionerProps<C>, 'handleClose'> {
  handleClose: (output: boolean) => void;
}

export type QuestionRenderDescription<C = never> =
  | {
      content: ReactNode;
      heading: ReactNode;
      okText?: string;
      cancelText?: string;
    }
  | ((props: QuestionRendererProps<C>) => ReactNode);

export interface QuestionOptions extends Omit<ModalOptions, 'render'> {
  deps: DependencyList;
  portal?: ImperativePortal;
}

export const useQuestion = <C extends unknown = never>(
  renderDescription: QuestionRenderDescription<C>,
  options: QuestionOptions
) => {
  const { defaults, locale } = useContext(SystemContext);
  const { deps, portal, onClose, ...modalProps } = useMemo(
    () => ({
      ...defaults?.dropOptions,
      ...options
    }),
    [options]
  );
  const handleQuestionClose = useRef<
    undefined | QuestionRendererProps['handleClose']
  >();
  const openModal = useModal<C>(
    props => {
      const targetProps = {
        ...props,
        handleClose: (v: boolean) => handleQuestionClose.current?.(v)
      };
      return renderDescription instanceof Function ? (
        renderDescription(targetProps)
      ) : (
        <BasicQuestion
          onClose={targetProps.handleClose}
          {...renderDescription}
        />
      );
    },
    {
      deps: [locale, ...deps],
      kind: 'question',
      ...modalProps
    }
  );
  return useCallback(
    (context?: C) => {
      return new Promise<boolean>(resolve => {
        const close = openModal(context);
        handleQuestionClose.current = (v: boolean) => {
          resolve(v);
          close();
          handleQuestionClose.current = undefined;
        };
        return handleQuestionClose.current;
      });
    },
    [openModal]
  );
};
