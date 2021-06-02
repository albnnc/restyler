import { Scroll } from 'docs/components/shared';
import { blueprintTheme } from 'docs/core';
import React from 'react';

export const Blueprint = () => (
  <Scroll
    theme={blueprintTheme}
    containerProps={{ theme: blueprintTheme }}
    containerContentProps={{ theme: blueprintTheme }}
  />
);
