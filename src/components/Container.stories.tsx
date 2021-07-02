import React from 'react';
import { Container } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'containers/Container'
};

export const Basics = () => {
  const dimm = 'rgba(0, 0, 0, 0.2)';
  return (
    <Container
      background={dimm}
      contentProps={{ background: dimm }}
      css={{ width: '500px' }}
    >
      Lorem ipsum dolor sit amet
    </Container>
  );
};

export const Blueprint = createBlueprint('container');
