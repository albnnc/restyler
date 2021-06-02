import { Box, Button, SmartTable } from 'docs/components/shared';
import { useState, Fragment } from 'react';
import { data } from './data';

export const SmartTableDemo = () => {
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
        <SmartTable
          data={hasData ? data : []}
          columns={columns}
          primaryKey="id"
          expansion={({ person }) => <Box>Hey, my name is {person}</Box>}
        />
      </Box>
    </Fragment>
  );
};

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
