import { Box, Button, DataTable } from 'docs/components/shared';
import { useState, Fragment } from 'react';
import { data, Datum } from './data';

export const DataTableDemo = () => {
  const [hasData, setHasData] = useState(true);
  return (
    <Fragment>
      <Button kind="primary" onClick={() => setHasData(!hasData)}>
        Toggle data
      </Button>
      <Box
        radius="small"
        elevation="small"
        background="white"
        margin={{ top: 'medium' }}
        css={{ overflow: 'hidden', minWidth: '350px' }}
      >
        <DataTable
          data={hasData ? data : []}
          columns={columns}
          expansion={({ person }: Datum) => <Box>Hey, my name is {person}</Box>}
        />
      </Box>
    </Fragment>
  );
};

const columns = [
  {
    key: 'id',
    header: '#',
    sort: true,
    isPrimary: true
  },
  {
    key: 'person',
    header: 'Name',
    sort: true
  },
  {
    key: 'favColor',
    header: 'Fav Color',
    render: ({ favColor }: Datum) => <Box color={favColor}>{favColor}</Box>
  }
];
