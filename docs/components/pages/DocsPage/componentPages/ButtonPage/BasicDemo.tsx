import React from 'react';
import { Button } from '~docs/components/shared';

export const BasicDemo = () => {
  return (
    <>
      <Button margin="small">Default</Button>
      <Button kind="primary" margin="small">
        Primary
      </Button>
      <Button kind="success" margin="small">
        Success
      </Button>
      <Button kind="warning" margin="small">
        Warning
      </Button>
      <Button kind="danger" margin="small">
        Danger
      </Button>
    </>
  );
};
