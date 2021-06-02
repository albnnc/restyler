import { NotificationOptions, QuestionOptions } from 'lib/components';
import { isValidElement, useCallback, ReactChild } from 'react';
import { useLoader } from './useLoader';
import { useModal } from './useModal';
import { useNotification } from './useNotification';

export const useOperation = <TOperationOptions, TOperationResult>(
  fn: (options?: TOperationOptions) => Promise<TOperationResult>,
  {
    getNotification,
    getQuestion,
    loaderIds
  }: {
    getNotification?: (
      isOk: boolean,
      result: TOperationResult
    ) => ReactChild | Omit<NotificationOptions, 'system'>;
    getQuestion?: (
      options: TOperationOptions
    ) => Omit<QuestionOptions, 'system'>;
    loaderIds?: any[];
  }
) => {
  const [isLoading, load] = useLoader(loaderIds);
  const { openQuestion } = useModal();
  const { openNotification } = useNotification();
  const operation = useCallback(
    async (options: TOperationOptions) => {
      const questionOptions = getQuestion?.(options);
      const shouldContinue = questionOptions
        ? await openQuestion(questionOptions)
        : true;
      if (!shouldContinue) {
        return;
      }
      let isOk = true;
      let result;
      try {
        result = await load(fn(options));
      } catch (e) {
        result = e;
        isOk = false;
      }
      const notification = getNotification?.(isOk, result);
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
    },
    [isLoading]
  );
  return operation;
};
