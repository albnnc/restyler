import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import { Box, Masonry } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'containers/Masonry'
};

export const Basics = () => {
  const heights = [100, 200, 300, 100, 250, 100, 120, 110];
  const counts = useRef(heights.map(() => 0)).current;
  const Component = useCallback(({ index, height }) => {
    const [_, update] = useReducer(v => v + 1, 0);
    useEffect(() => {
      counts[index]++;
      update();
    }, []);
    return (
      <Box background="rgba(0, 0, 0, 0.2)" css={{ height: `${height}px` }}>
        <Box>#{index}</Box>
        <Box>Times mounted: {counts[index]}</Box>
      </Box>
    );
  }, []);
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
        <Component key={i} index={i} height={v} />
      ))}
    </Masonry>
  );
};

export const Blueprint = createBlueprint('masonry');
