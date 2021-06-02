import {
  Box,
  Button,
  Container,
  Heading,
  Navbar,
  NavAnchor
} from 'docs/components/shared';
import { css } from 'emotion';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const LandingPage = () => {
  const history = useHistory();
  return (
    <>
      <Navbar />
      <Box
        background="darkGrey"
        padding={{ vertical: 'larger', horizontal: 'large' }}
      >
        <Box direction="column" color="white" justify="center" align="center">
          <Heading kind="1" color="inherit" margin="none">
            Restyler
          </Heading>
          <Box
            margin={{ top: 'small', bottom: 'large' }}
            weight="light"
            font="large"
          >
            A design system built for React
          </Box>
          <Button
            color="white"
            border="rgba(255, 255, 255, 0.2)"
            padding={{ vertical: 'small', horizontal: 'medium' }}
            radius="none"
            margin="auto"
            font="small"
            weight="light"
            extend={{
              textTransform: 'uppercase',
              letterSpacing: '0.04rem',
              transition: 'background 0.2s',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.05)'
              }
            }}
            onClick={() => history.push('/docs')}
          >
            Discover
          </Button>
        </Box>
      </Box>
      <Container padding={{ vertical: 'larger' }}>
        <Heading kind="2" margin={{ top: 'none' }}>
          About
        </Heading>
        <Box>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis
          ligula lectus, id pretium leo rutrum vel. Phasellus metus est,
          elementum at mollis non, dictum in mauris. Vivamus et magna eu turpis
          viverra lacinia ut id sem. Curabitur congue id libero ut tempor.
          Maecenas porta non massa et laoreet. Etiam sagittis orci in consequat
          ultricies. Sed magna arcu, pretium ac ipsum in, vulputate egestas
          nunc. Morbi tristique sem tellus, non pharetra quam rutrum eu. Nulla
          tristique gravida massa, gravida sollicitudin velit. Cras a rutrum
          felis. Fusce ornare nibh eros, ut interdum arcu fermentum ut. Quisque
          et elementum dolor. Curabitur sodales ultricies massa nec condimentum.
          Aenean maximus lacus ut efficitur bibendum.
        </Box>
        <Box margin={{ top: 'medium' }}>
          For further reading please continue to the{' '}
          <NavAnchor to="/docs">Docs</NavAnchor> page.
        </Box>
        <Heading kind="2">Helping the project</Heading>
        <Box>
          Vivamus sodales finibus ipsum sed sodales. Maecenas accumsan dapibus
          leo eu elementum. Vivamus risus est, fermentum id quam vel, cursus
          ultrices massa. Sed eget suscipit tortor. Etiam cursus velit ac ligula
          tristique eleifend a vitae eros. Nam et lorem dui. Vivamus lobortis
          ante interdum, auctor lacus eget, sodales risus. Nullam arcu nunc,
          pellentesque egestas suscipit et, maximus sit amet leo. Cras vel
          hendrerit nulla, at semper lectus. Integer venenatis, lacus.
        </Box>
        <Box margin={{ vertical: 'large' }} border={{ bottom: 'border' }} />
        <Box direction="row" justify="center" font="small">
          Restyler — 2020
        </Box>
      </Container>
    </>
  );
};
