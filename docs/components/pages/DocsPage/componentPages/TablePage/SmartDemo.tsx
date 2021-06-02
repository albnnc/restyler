import { Box, SmartTable } from 'docs/components/shared';
import React from 'react';
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

export const SmartDemo = () => (
  <Box
    radius="small"
    elevation="smaller"
    background="white"
    extend={{ overflow: 'hidden', minWidth: '350px' }}
  >
    <SmartTable
      caption="A table of persons"
      data={data}
      columns={columns}
      primaryKey="id"
      expansion={({ person }) => <Box>Hey, my name is {person}</Box>}
    />
  </Box>
);
