import { Button } from 'docs/components/shared';
import { Fragment } from 'react';

export const BasicDemo = () => {
  return (
    <Fragment>
      <Button margin="small">Default</Button>
      <Button kind="primary" margin="small">
        Primary
      </Button>
      <Button kind="secondary" margin="small">
        Secondary
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
      <Button kind="primary" margin="small" disabled>
        Disabled
      </Button>
    </Fragment>
  );
};
