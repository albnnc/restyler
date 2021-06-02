import React from 'react';
import { Container } from 'src';

export default {
  title: 'containers/Container'
};

export const Basic = () => {
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
