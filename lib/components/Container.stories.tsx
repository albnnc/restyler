/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { createBlueprint } from 'docs/utils';
import { Container } from 'lib';

export default {
  title: 'Containers/Container'
} as Meta;

export const Basics = () => (
  <Container
    sx={{
      width: '500px',
      '&, & > *': { bg: 'accentSurface' }
    }}
  >
    Lorem ipsum dolor sit amet
  </Container>
);

export const Blueprint = createBlueprint('container');
