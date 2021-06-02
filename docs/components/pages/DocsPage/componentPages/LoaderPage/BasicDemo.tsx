import { Button } from 'docs/components/shared';
import { delay } from 'docs/core';
import { useLoader } from 'lib';
import { useCallback, useMemo } from 'react';

export const BasicDemo = () => {
  const loaderId = useMemo(() => Symbol(), []);
  const [isLoading, load] = useLoader([loaderId]);
  const addTask = useCallback(() => {
    load(delay(2000));
    load(delay(500));
    load(
      (async () => {
        await delay(200);
        throw new Error();
      })()
    );
  }, []);
  return (
    <Button kind="primary" onClick={addTask} disabled={isLoading}>
      Add Task
    </Button>
  );
};
