import { isValidElement, useCallback, Fragment, ReactNode } from 'react';
import { useLoader } from './useLoader';
import { useModal } from './useModal';
import { QuestionOptions } from './useModal';
import { NotificationOptions, useNotification } from './useNotification';

export interface OperationOptions<OperationInput, OperationOutput> {
  deps: any[];
  getNotification?: <T extends boolean>(
    isOk: T,
    output: T extends true ? OperationOutput : Error
  ) => ReactNode | NotificationOptions;
  getQuestion?: (input?: OperationInput) => QuestionOptions;
  loaderIds?: any[];
}

export const useOperation = <OperationInput, OperationOutput>(
  fn: (input?: OperationInput) => Promise<OperationOutput>,
  {
    deps,
    getNotification,
    getQuestion,
    loaderIds
  }: OperationOptions<OperationInput, OperationOutput>
) => {
  const [_, load] = useLoader(loaderIds);
  const { openQuestion } = useModal();
  const { openNotification } = useNotification();
  const operation = useCallback(
    async (input?: OperationInput): Promise<void> => {
      const questionOptions = getQuestion?.(input);
      const shouldContinue = questionOptions
        ? await openQuestion(questionOptions)
        : true;
      if (!shouldContinue) {
        return undefined;
      }
      let isOk = true;
      let output: OperationOutput | undefined;
      let error: Error | undefined;
      try {
        output = await load(fn(input));
      } catch (e) {
        error = e;
        isOk = false;
      }
      const notification = getNotification?.(isOk, (error ?? output)!);
      if (notification) {
        const notificationOptions: NotificationOptions =
          typeof notification === 'object' &&
          !isValidElement(notification) &&
          !Array.isArray(notification) &&
          (notification as any).type !== Fragment
            ? (notification as NotificationOptions)
            : {
                kind: isOk ? 'success' : 'danger',
                render: () => notification
              };
        openNotification(notificationOptions);
      }
      return undefined;
    },
    [openQuestion, openNotification, ...deps]
  );
  return operation;
};
