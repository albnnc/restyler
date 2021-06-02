import { Box, Button, SmartTable } from 'docs/components/shared';
import React, { useState } from 'react';
import { data } from './data';

const columns = [
  {
    key: 'id',
    header: '#',
    sort: true
  },
  {
    key: 'person',
    header: 'Name',
    sort: true
  },
  {
    key: 'favColor',
    header: 'Fav Color',
    render: favColor => <Box color={favColor}>{favColor}</Box>
  }
];

export const SmartDemo = () => {
  const [hasData, setHasData] = useState(true);
  return (
    <>
      <Button kind="primary" onClick={() => setHasData(!hasData)}>
        Toggle data
      </Button>
      <Box
        radius="small"
        elevation="small"
        background="white"
        margin={{ top: 'small' }}
        extend={{ overflow: 'hidden', minWidth: '350px' }}
      >
        <SmartTable
          data={hasData ? data : []}
          columns={columns}
          primaryKey="id"
          expansion={({ person }) => <Box>Hey, my name is {person}</Box>}
        />
      </Box>
    </>
  );
};
