import { Box, Button } from 'docs/components/shared';
import { delay } from 'docs/core';
import { useLoader } from 'lib';
import { useCallback } from 'react';

export const SharedLoaderDemo = () => {
  const [isLoading, load] = useLoader([sharedLoaderId]);
  return (
    <Box direction="column">
      <AnotherComponent />
      <Box
        margin={{ top: 'medium' }}
        padding="medium"
        radius="small"
        border={{
          color: isLoading ? 'warning' : 'success',
          style: 'dashed'
        }}
      >
        {isLoading ? 'Loading' : 'Idling'}
      </Box>
    </Box>
  );
};

const sharedLoaderId = Symbol();

const AnotherComponent = () => {
  const [isLoading, load] = useLoader([sharedLoaderId]);
  const addTask = useCallback(() => load(delay(2000)), []);
  return (
    <Button kind="primary" onClick={addTask}>
      Add Task
    </Button>
  );
};
