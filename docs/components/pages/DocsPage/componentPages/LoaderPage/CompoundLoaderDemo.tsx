import { Box, Button } from 'docs/components/shared';
import { delay } from 'docs/core';
import { useLoader, ButtonProps } from 'lib';
import { useCallback, useMemo } from 'react';

export const CompoundLoaderDemo = () => {
  const a = useMemo(() => Symbol(), []);
  const b = useMemo(() => Symbol(), []);
  const c = useMemo(() => Symbol(), []);
  return (
    <Box direction="row" css={{ gap: '0.5rem' }}>
      <Loadable ids={[a]}>A</Loadable>
      <Loadable ids={[b]}>B</Loadable>
      <Loadable ids={[c]}>C</Loadable>
      <Loadable ids={[]}>D</Loadable>
      <Loadable ids={[a, b]}>A + B</Loadable>
      <Loadable ids={[b, c]}>B + C</Loadable>
      <Loadable ids={undefined}>Global</Loadable>
    </Box>
  );
};

const Loadable = ({
  ids,
  ...rest
}: { ids: any[] | undefined } & ButtonProps) => {
  const [isLoading, load] = useLoader(ids);
  const handleClick = useCallback(() => load(delay(2000)), []);
  return (
    <Button
      kind="primary"
      disabled={isLoading}
      onClick={handleClick}
      {...rest}
    />
  );
};
