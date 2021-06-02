import { Box, DataTable, Scroll } from 'docs/components/shared';

export const TableDemo = () => {
  return (
    <Scroll css={{ width: '300px' }}>
      <Box css={{ width: '500px' }}>
        <DataTable
          data={[
            { x: 1, y: 7, z: 10 },
            { x: 2, y: 2, z: 28 },
            { x: 3, y: 8, z: 52 },
            { x: 4, y: 9, z: 92 },
            { x: 5, y: 0, z: 12 }
          ]}
          columns={[
            { key: 'x', header: 'x', isPrimary: true },
            { key: 'y', header: 'y' },
            { key: 'z', header: 'z' }
          ]}
          expansion={({ x, y, z }) => `x + y + z = ${x + y + z}`}
        />
      </Box>
    </Scroll>
  );
};
