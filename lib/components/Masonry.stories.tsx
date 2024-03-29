/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import { compact } from 'docs/decorators';
import { createBlueprint } from 'docs/utils';
import { Box, Button, Masonry } from 'lib';

export default {
  title: 'Containers/Masonry',
  decorators: [compact('700px')]
} as Meta;

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
      <Box
        sx={{
          height: `${height}px`,
          backgroundColor: 'border',
          color: 'onPrimary',
          fontWeight: 300
        }}
      >
        <Box>#{index}</Box>
        <Box>Times mounted: {mountsCounts[index]}</Box>
        <Box>Times rendered: {rendersCounts[index]}</Box>
      </Box>
    );
  }, []);

  return (
    <Box>
      <Button kind="primary" sx={{ mb: 3 }} onClick={toggle}>
        Toggle
      </Button>
      <Masonry
        columns={{ count: columnsCount }}
        sx={{ '&, & > *': { gap: '5px' } }}
      >
        {heights.map((v, i) => (
          <Component key={i} height={v} index={i} />
        ))}
      </Masonry>
    </Box>
  );
};

export const Blueprint = createBlueprint('masonry');
