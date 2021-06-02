import { jsx } from '@emotion/core';
import { Button } from 'docs/components/shared';
import { delay } from 'docs/core';
import { useLoader, useOperation, Box } from 'lib';
import { useMemo, Fragment } from 'react';

export const BasicDemo = () => {
  const loaderId = useMemo(() => Symbol(), []);
  const [isLoading] = useLoader([loaderId]);
  const handleClick = useOperation(
    async (id: number) => {
      await delay(2000);
      return id;
    },
    {
      loaderIds: [loaderId],
      getQuestion: id => ({
        heading: 'User Modification',
        content: `Are you sure you want to modify user #${id}?`
      }),
      getNotification: (isOk, id) =>
        isOk ? `Successfuly modified user #${id}` : 'An error occured'
    }
  );
  return (
    <Fragment>
      <Button
        kind="primary"
        onClick={() => handleClick(5)}
        disabled={isLoading}
      >
        Add Task
      </Button>
      <Box></Box>
    </Fragment>
  );
};
