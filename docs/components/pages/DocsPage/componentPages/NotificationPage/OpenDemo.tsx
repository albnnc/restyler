import { openNotification, Button } from 'docs/components/shared';
import { Fragment } from 'react';

export const OpenDemo = () => (
  <Button
    kind="primary"
    onClick={() => {
      openNotification({
        kind: 'success',
        render: () => (
          <Fragment>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Fragment>
        )
      });
    }}
  >
    Open
  </Button>
);
