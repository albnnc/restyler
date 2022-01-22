/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Button, useNotification } from 'lib';

export default {
  title: 'hooks/useNotification'
} as Meta;

export const Basics = () => {
  const { openNotification } = useNotification();
  return (
    <Button
      kind="primary"
      onClick={() =>
        openNotification({
          kind: 'success',
          duration: 500,
          render: () => 'Lorem ipsum dolor sit amet'
        })
      }
    >
      Open
    </Button>
  );
};
