import { Box, Input } from 'docs/components/shared';

export const BasicDemo = () => (
  <Box direction="column" css={{ '& input': { margin: '0.5rem' } }}>
    <Input placeholder="Basic" />
    <Input disabled placeholder="Disabled" />
    <Input invalid placeholder="Invalid" />
    <Input disabled invalid placeholder="Disabled invalid" />
  </Box>
);
