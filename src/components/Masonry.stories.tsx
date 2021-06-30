import React from 'react';
import { Box, Masonry } from 'src';
import { blueprinted } from 'storybook/decorators';

export default {
  title: 'containers/Masonry'
};

export const Blueprint = () => {
  return <Masonry columns={{ count: 1 }} />;
};
Blueprint.decorators = [blueprinted];

export const Basics = () => {
  const heights = [100, 200, 300, 100, 250, 100, 120, 110];
  return (
    <Masonry
      columns={{
        minWidth: '200px',
        getProps: () => ({ gap: '5px' })
      }}
      gap="5px"
      css={{ width: '100%', maxWidth: '700px' }}
    >
      {heights.map((v, i) => (
        <Box key={i} background="rgba(0, 0, 0, 0.2)" css={{ height: `${v}px` }}>
          {i + 1}
        </Box>
      ))}
    </Masonry>
  );
};
