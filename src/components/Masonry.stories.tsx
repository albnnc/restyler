import React from 'react';
import { Box, Masonry } from 'src';
import { blueprinted } from 'storybook/decorators';

export default {
  title: 'containers/Masonry'
};

export const Blueprint = () => {
  return <Masonry />;
};
Blueprint.decorators = [blueprinted];

export const Basics = () => {
  return (
    <Masonry
      template="repeat(3, 200px)"
      gap="5px"
      css={{ width: '500px' }}
      columnProps={{ gap: '5px' }}
    >
      <Box background="lightGrey" css={{ height: '100px' }}>
        1
      </Box>
      <Box background="lightGrey" css={{ height: '200px' }}>
        2
      </Box>
      <Box background="lightGrey" css={{ height: '300px' }}>
        3
      </Box>
      <Box background="lightGrey" css={{ height: '100px' }}>
        4
      </Box>
      <Box background="lightGrey" css={{ height: '250px' }}>
        5
      </Box>
      <Box background="lightGrey" css={{ height: '100px' }}>
        6
      </Box>
      <Box background="lightGrey" css={{ height: '120px' }}>
        7
      </Box>
      <Box background="lightGrey" css={{ height: '100px' }}>
        8
      </Box>
    </Masonry>
  );
};
