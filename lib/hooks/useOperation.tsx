import { NotificationOptions, QuestionOptions } from 'lib/components';
import { isValidElement, useCallback, ReactChild } from 'react';
import { useLoader } from './useLoader';
import { useModal } from './useModal';
import { useNotification } from './useNotification';

export interface OperationOptions<TOperationInput, TOperationOutput> {
  deps: any[];
  getNotification?: <T extends boolean>(
    isOk: T,
    output: T extends true ? TOperationOutput : Error
  ) =>
    | ReactChild
    | boolean
    | null
    | undefined
    | Omit<NotificationOptions, 'system'>;
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
        isValidElement(notification) || typeof notification !== 'object'
          ? {
              kind: isOk ? 'success' : 'danger',
              render: () => notification
            }
          : notification;
      openNotification(notificationOptions);
    }
    return undefined;
  }, deps);
  return operation;
};
