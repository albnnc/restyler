import { Box, Button } from 'docs/components/shared';
import { useTransition } from 'lib';
import { useRef, useState, Fragment } from 'react';

export const BasicDemo = () => {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isReallyMounted, transitionProps] = useTransition(ref, isMounted);
  return (
    <Fragment>
      <Button
        kind="primary"
        onClick={() => setIsMounted(!isMounted)}
        css={{ position: 'relative' }}
      >
        Toggle
        {isReallyMounted && (
          <Box
            ref={ref}
            background="grey"
            margin={{ left: 'medium' }}
            css={{
              position: 'absolute',
              right: '-1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '1em',
              height: '1em',
              transition: 'all 0.5s',
              opacity: 1,
              '&[data-transition]': {
                opacity: 0
              }
            }}
            {...transitionProps}
          />
        )}
      </Button>
    </Fragment>
  );
};
