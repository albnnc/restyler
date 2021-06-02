import { Box, Button } from 'docs/components/shared';
import React from 'react';

export const OthersDemo = () => (
  <Box direction="row">
    <Button kind="close" />
    <Button kind="arrowUp" margin={{ left: 'small' }} />
    <Button kind="arrowDown" margin={{ left: 'small' }} />
    <Button kind="arrowLeft" margin={{ left: 'small' }} />
    <Button kind="arrowRight" margin={{ left: 'small' }} />
  </Box>
);
