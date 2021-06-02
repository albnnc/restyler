import { Box, Button, DataTable } from 'docs/components/shared';
import { SortDirection } from 'lib';
import { useCallback, useState, Fragment } from 'react';
import { data } from './data';

export const ControlledSortDemo = () => {
  const [direction, setDirection] = useState<SortDirection | undefined>();
  const changeDirection = useCallback(
    () =>
      setDirection(
        {
          '': 'asc',
          asc: 'desc',
          desc: undefined
        }[direction ?? ''] as SortDirection | undefined
      ),
    [direction]
  );
  return (
    <Fragment>
      <Button kind="primary" onClick={changeDirection}>
        Toggle sort
      </Button>
      <Box
        radius="small"
        elevation="small"
        background="white"
        margin={{ top: 'medium' }}
        css={{ overflow: 'hidden', minWidth: '350px' }}
      >
        <DataTable
          data={data}
          columns={[
            {
              key: 'id',
              header: '#',
              sort: direction ? { direction } : false,
              isPrimary: true
            },
            {
              key: 'person',
              header: 'Name',
              sort: true
            }
          ]}
        />
      </Box>
    </Fragment>
  );
};
