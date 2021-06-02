import { Button } from 'docs/components/shared';
import React from 'react';

export const ContainedDemo = () => {
  return (
    <>
      <Button kind="contained-primary" margin="small">
        Primary
      </Button>
      <Button kind="contained-success" margin="small">
        Success
      </Button>
      <Button kind="contained-warning" margin="small">
        Warning
      </Button>
      <Button kind="contained-danger" margin="small">
        Danger
      </Button>
    </>
  );
};
