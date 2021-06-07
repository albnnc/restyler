import React from 'react';
import { Container } from 'src';
import { blueprinted } from 'storybook/decorators';

export default {
  title: 'containers/Container'
};

export const Blueprint = () => {
  return <Container />;
};
Blueprint.decorators = [blueprinted];

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
