import { openModal, Button } from 'docs/components/shared';
import React from 'react';

export const OpenDemo = () => {
  return (
    <Button
      kind="primary"
      onClick={() => openModal({ render: () => 'Modal content' })}
    >
      Open
    </Button>
  );
};
