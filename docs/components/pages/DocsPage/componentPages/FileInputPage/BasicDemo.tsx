import { Box, File } from 'docs/components/shared';
import React from 'react';

export const BasicDemo = () => (
  <Box direction="column">
    <File placeholder="Basic" inputProps={{ multiple: true }} />
  </Box>
);
