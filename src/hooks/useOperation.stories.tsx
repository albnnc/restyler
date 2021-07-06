import { Meta } from '@storybook/react';
import React from 'react';
import { Box, Button, useOperation } from 'src';
import { delay } from 'storybook/utils';

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
    <Box direction="row">
      <Button kind="success" onClick={() => handleClick()}>
        Success
      </Button>
      <Button
        kind="danger"
        margin={{ left: 'small' }}
        onClick={() => handleClick(true)}
      >
        Failure
      </Button>
    </Box>
  );
};
