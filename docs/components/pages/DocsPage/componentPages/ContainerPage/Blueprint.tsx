import React from 'react';
import { Container } from '~docs/components/shared';
import { blueprintTheme } from '~docs/core';

export const Blueprint = () => (
  <Container theme={blueprintTheme} contentProps={{ theme: blueprintTheme }} />
);
