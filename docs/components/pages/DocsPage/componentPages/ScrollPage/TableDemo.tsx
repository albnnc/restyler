import { Box, Scroll, SmartTable } from 'docs/components/shared';
import React from 'react';

export const TableDemo = () => {
  return (
    <Scroll extend={{ width: '300px' }}>
      <Box extend={{ width: '500px' }}>
        <SmartTable
          primaryKey="x"
          data={[
            { x: 1, y: 7, z: 10 },
            { x: 2, y: 2, z: 28 },
            { x: 3, y: 8, z: 52 },
            { x: 4, y: 9, z: 92 },
            { x: 5, y: 0, z: 12 }
          ]}
          columns={[
            { key: 'x', header: 'x' },
            { key: 'y', header: 'y' },
            { key: 'z', header: 'z' }
          ]}
          expansion={({ x, y, z }) => `x + y + z = ${x + y + z}`}
        />
      </Box>
    </Scroll>
  );
};
