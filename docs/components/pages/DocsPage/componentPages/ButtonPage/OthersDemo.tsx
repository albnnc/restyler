import React from 'react';
import { Box, Button } from '~docs/components/shared';

export const OthersDemo = () => (
  <Box direction="row">
    <Button kind="close" />
    <Button kind="arrow-up" margin={{ left: 'small' }} />
    <Button kind="arrow-down" margin={{ left: 'small' }} />
    <Button kind="arrow-left" margin={{ left: 'small' }} />
    <Button kind="arrow-right" margin={{ left: 'small' }} />
  </Box>
);
