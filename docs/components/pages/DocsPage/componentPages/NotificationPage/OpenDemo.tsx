import React from 'react';
import { openNotification, Button } from '~docs/components/shared';

export const OpenDemo = () => (
  <Button
    kind="primary"
    onClick={() => {
      openNotification({
        kind: 'success',
        render: () => (
          <>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </>
        )
      });
    }}
  >
    Open
  </Button>
);
