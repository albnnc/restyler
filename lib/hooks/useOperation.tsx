import { NotificationOptions, QuestionOptions } from 'lib/components';
import { isValidElement, useCallback, ReactChild } from 'react';
import { useLoader } from './useLoader';
import { useModal } from './useModal';
import { useNotification } from './useNotification';

export const useOperation = <TOperationOptions, TOperationResult>(
  fn: (options?: TOperationOptions) => Promise<TOperationResult>,
  {
    deps,
    getNotification,
    getQuestion,
    loaderIds
  }: {
    deps: any[];
    getNotification?: <T extends boolean>(
      isOk: T,
      result: T extends true ? TOperationResult : Error
    ) =>
      | ReactChild
      | boolean
      | null
      | undefined
      | Omit<NotificationOptions, 'system'>;
    getQuestion?: (
      options?: TOperationOptions
    ) => Omit<QuestionOptions, 'system'>;
    loaderIds?: any[];
  }
) => {
  const [isLoading, load] = useLoader(loaderIds);
  const { openQuestion } = useModal();
  const { openNotification } = useNotification();
  const operation = useCallback(async (options?: TOperationOptions): Promise<
    TOperationResult | undefined
  > => {
    const questionOptions = getQuestion?.(options);
    const shouldContinue = questionOptions
      ? await openQuestion(questionOptions)
      : true;
    if (!shouldContinue) {
      return;
    }
    let isOk = true;
    let result: TOperationResult | undefined;
    let error: Error | undefined;
    try {
      result = await load(fn(options));
    } catch (e) {
      error = e;
      isOk = false;
    }
    const notification = getNotification?.(isOk, (error ?? result)!);
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
    if (error) {
      throw error;
    }
    return result;
  }, deps);
  return operation;
};
