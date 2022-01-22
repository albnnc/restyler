/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { delay } from 'docs/utils';
import { Box, Button, useOperation } from 'lib';

export default {
  title: 'hooks/useOperation'
} as Meta;

export const Basics = () => {
  const handleClick = useOperation(
    async (shouldFail?: boolean) => {
      await delay(1000);
      if (shouldFail) {
        throw new Error();
      }
    },
    {
      deps: [],
      getQuestion: () => ({
        heading: 'Important Heading',
        content: 'Are you sure you want to continue?'
      }),
      getNotification: isOk => (isOk ? 'Success' : 'Failure')
    }
  );
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button kind="success" onClick={() => handleClick()}>
        Success
      </Button>
      <Button kind="danger" onClick={() => handleClick(true)}>
        Failure
      </Button>
    </Box>
  );
};
