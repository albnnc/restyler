import { Select } from 'docs/components/shared';
import React from 'react';

export const BasicDemo = () => (
  <Select
    placeholder="Select value"
    options={[
      { name: 'One', value: 1 },
      { name: 'Two', value: 2 },
      { name: 'Three', value: 3 },
      { name: 'Four', value: 4 },
      { name: 'Five', value: 5 },
      { name: 'Six', value: 6 },
      { name: 'Seven', value: 7 },
      { name: 'Eight', value: 8 },
      { name: 'Nine', value: 9 },
      { name: 'Ten', value: 10 }
    ]}
  />
);
