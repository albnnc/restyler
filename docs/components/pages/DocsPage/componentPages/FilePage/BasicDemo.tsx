import { Box, File } from 'docs/components/shared';

export const BasicDemo = () => (
  <Box direction="column">
    <File placeholder="Basic" inputProps={{ multiple: true }} />
  </Box>
);
