import { Meta } from '@storybook/react';
import React from 'react';
import { Button, useNotification } from 'src';

export default {
  title: 'hooks/useNotification'
} as Meta;

export const Question = () => {
  const { openNotification } = useNotification();
  return (
    <Button
      kind="primary"
      onClick={() =>
        openNotification({
          kind: 'success',
          duration: 500,
          render: () => 'QWERTY'
        })
      }
    >
      Open
    </Button>
  );
};
