/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { Button } from 'src';

export default {
  title: 'naviagtion/Button'
};

export const Basics = () => {
  return (
    <Button kind="primary" sx={{ mb: 3 }}>
      Click Me
    </Button>
  );
};

// export const Blueprint = createBlueprint('button');
