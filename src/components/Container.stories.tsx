/** @jsx jsx */
import { jsx } from '@theme-ui/core';
import { Container } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Containers/Container'
};

export const Basics = () => {
  return (
    <Container
      sx={{
        width: '500px',
        '&, & > *': { bg: 'rgba(0, 0, 0, 0.2)' }
      }}
    >
      Lorem ipsum dolor sit amet
    </Container>
  );
};

export const Blueprint = createBlueprint('container');
