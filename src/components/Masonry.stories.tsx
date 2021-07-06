import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import { Box, Button, Masonry } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'containers/Masonry'
};

export const Basics = () => {
  const [columnsCount, toggle] = useReducer(v => (v === 2 ? 3 : 2), 3);
  const heights = [100, 200, 300, 100, 250, 100, 120, 110];
  const mountsCounts = useRef(heights.map(() => 0)).current;
  const rendersCounts = useRef(heights.map(() => 0)).current;

  const Component = useCallback(({ index, height }) => {
    const [_, update] = useReducer(v => v + 1, 0);
    useEffect(() => {
      rendersCounts[index]++;
    });
    useEffect(() => {
      mountsCounts[index]++;
      update();
    }, []);
    return (
      <Box background="rgba(0, 0, 0, 0.2)" css={{ height: `${height}px` }}>
        <Box>#{index}</Box>
        <Box>Times mounted: {mountsCounts[index]}</Box>
        <Box>Times rendered: {rendersCounts[index]}</Box>
      </Box>
    );
  }, []);

  return (
    <Box direction="column">
      <Button kind="primary" margin={{ bottom: 'medium' }} onClick={toggle}>
        Toggle
      </Button>
      <Masonry
        columns={{
          count: columnsCount,
          getProps: () => ({ gap: '5px' })
        }}
        gap="5px"
        css={{ width: '600px', maxWidth: '700px' }}
      >
        {heights.map((v, i) => (
          <Component key={i} index={i} height={v} />
        ))}
      </Masonry>
    </Box>
  );
};

export const Blueprint = createBlueprint('masonry');
