import { Button, FormField } from 'docs/components/shared';
import React from 'react';

export const AddonsDemo = () => (
  <FormField
    name="a"
    label="Field with suffix"
    suffix={
      <Button kind="primary" margin={{ left: 'small' }}>
        Add
      </Button>
    }
  />
);
