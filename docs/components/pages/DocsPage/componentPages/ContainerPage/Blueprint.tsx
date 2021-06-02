import { Container } from 'docs/components/shared';
import { blueprintTheme } from 'docs/core';
import React from 'react';

export const Blueprint = () => (
  <Container theme={blueprintTheme} contentProps={{ theme: blueprintTheme }} />
);
