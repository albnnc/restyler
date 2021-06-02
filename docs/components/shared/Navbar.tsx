import { jsx } from '@emotion/core';
import { NavAnchor, NavAnchorProps } from './NavAnchor';
import { Box, Container } from './registry';

const StyledAnchor = (props: NavAnchorProps) => (
  <NavAnchor
    weight="light"
    css={{
      letterSpacing: '0.04rem',
      transition: 'color 0.1s',
      color: 'rgba(255, 255, 255, 0.7)',
      '&:hover': {
        color: 'white'
      }
    }}
    {...props}
  />
);

export const Navbar = () => {
  return (
    <Container
      padding={{ vertical: '1.5rem' }}
      contentProps={{
        direction: 'row',
        justify: 'between',
        align: 'center',
        css: {
          maxWidth: '100%',
          width: 'calc(100% - 4rem)'
        }
      }}
      elevation="larger"
      background="darkGrey"
      css={{
        position: 'relative',
        zIndex: 1
      }}
    >
      <Box direction="row">
        <StyledAnchor to="/">RESTYLER</StyledAnchor>
        <StyledAnchor to="/docs" margin={{ left: 'medium' }}>
          DOCS
        </StyledAnchor>
      </Box>
      <StyledAnchor href="https://github.com/albnnc/restyler">
        GITHUB
      </StyledAnchor>
    </Container>
  );
};
