import { Box, Progress } from 'docs/components/shared';

export const BasicDemo = () => {
  return (
    <Box direction="column">
      {ranges.map(({ value, kind }, i) => (
        <Box
          direction="row"
          justify="between"
          align="center"
          key={'range-' + i}
        >
          <span>
            {kind
              ? `${kind[0].toUpperCase() + kind.slice(1)} kind`
              : 'Zero value'}
          </span>
          <Progress value={value} kind={kind} margin={{ left: 'large' }} />
        </Box>
      ))}
    </Box>
  );
};

const ranges = [
  {
    value: 0
  },
  {
    value: 0.2,
    kind: 'danger'
  },
  {
    value: 0.5,
    kind: 'warning'
  },
  {
    value: 1,
    kind: 'success'
  },
  {
    value: 1,
    kind: 'primary'
  }
];
