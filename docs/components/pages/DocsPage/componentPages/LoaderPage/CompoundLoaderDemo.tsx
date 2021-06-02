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
      <Loadable loaderIds={[a]}>A</Loadable>
      <Loadable loaderIds={[b]}>B</Loadable>
      <Loadable loaderIds={[c]}>C</Loadable>
      <Loadable loaderIds={[a, b]}>A + B</Loadable>
      <Loadable loaderIds={[b, c]}>B + C</Loadable>
      <Loadable loaderIds={[]}>Global</Loadable>
    </Box>
  );
};

const Loadable = ({
  loaderIds,
  ...rest
}: { loaderIds: any[] } & ButtonProps) => {
  const [isLoading, load] = useLoader(...loaderIds);
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
