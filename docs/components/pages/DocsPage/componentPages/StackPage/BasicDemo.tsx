import { Box, Stack } from 'docs/components/shared';
import { MdNotifications } from 'react-icons/md';

export const BasicDemo = () => (
  <Stack anchor="topRight">
    <MdNotifications css={{ width: '3rem', height: '3rem' }} />
    <Box
      radius="100vw"
      background="primary"
      color="white"
      font="smaller"
      padding={{ horizontal: 'smaller' }}
    >
      23
    </Box>
  </Stack>
);
