import { isValidElement, useCallback, Fragment, ReactNode } from 'react';
import { NotificationOptions, QuestionOptions } from '../components';
import { useLoader } from './useLoader';
import { useModal } from './useModal';
import { useNotification } from './useNotification';

export interface OperationOptions<TOperationInput, TOperationOutput> {
  deps: any[];
  getNotification?: <T extends boolean>(
    isOk: T,
    output: T extends true ? TOperationOutput : Error
  ) => ReactNode | Omit<NotificationOptions, 'system'>;
  getQuestion?: (input?: TOperationInput) => Omit<QuestionOptions, 'system'>;
  loaderIds?: any[];
}

export const useOperation = <TOperationInput, TOperationOutput>(
  fn: (input?: TOperationInput) => Promise<TOperationOutput>,
  {
    deps,
    getNotification,
    getQuestion,
    loaderIds
  }: OperationOptions<TOperationInput, TOperationOutput>
) => {
  const [isLoading, load] = useLoader(loaderIds);
  const { openQuestion } = useModal();
  const { openNotification } = useNotification();
  const operation = useCallback(async (input?: TOperationInput): Promise<
    void
  > => {
    const questionOptions = getQuestion?.(input);
    const shouldContinue = questionOptions
      ? await openQuestion(questionOptions)
      : true;
    if (!shouldContinue) {
      return undefined;
    }
    let isOk = true;
    let output: TOperationOutput | undefined;
    let error: Error | undefined;
    try {
      output = await load(fn(input));
    } catch (e) {
      error = e;
      isOk = false;
    }
    const notification = getNotification?.(isOk, (error ?? output)!);
    if (notification) {
      const notificationOptions: Omit<NotificationOptions, 'system'> =
        typeof notification === 'object' &&
        !isValidElement(notification) &&
        !Array.isArray(notification) &&
        (notification as any).type !== Fragment
          ? notification
          : {
              kind: isOk ? 'success' : 'danger',
              render: () => notification
            };
      openNotification(notificationOptions);
    }
    return undefined;
  }, deps);
  return operation;
};
