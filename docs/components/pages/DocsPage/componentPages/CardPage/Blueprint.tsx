import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from '~docs/components/shared';
import { blueprintTheme } from '~docs/core';

export const Blueprint = () => {
  return (
    <Card theme={blueprintTheme}>
      <CardHeader theme={blueprintTheme} />
      <CardBody theme={blueprintTheme} />
      <CardFooter theme={blueprintTheme} />
    </Card>
  );
};
