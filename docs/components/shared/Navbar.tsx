import { css } from 'emotion';
import React from 'react';
import { NavAnchor, NavAnchorProps } from './NavAnchor';
import { Box } from './registry';

const StyledAnchor = (props: NavAnchorProps) => (
  <NavAnchor
    {...props}
    weight="light"
    color="rgba(255, 255, 255, 0.7)"
    className={css`
      transition: all 0.1s;
      &:hover {
        color: white;
      }
    `}
  />
);

export const Navbar = () => {
  return (
    <Box
      padding={{ vertical: '1.5rem', horizontal: 'large' }}
      direction="row"
      justify="between"
      align="center"
      elevation="x-large"
      background="grey-dark"
      className={css`
        position: relative;
        z-index: 1;
      `}
    >
      <Box direction="row">
        <StyledAnchor to="/">UNNAMED</StyledAnchor>
        <StyledAnchor to="/docs" margin={{ left: 'medium' }}>
          DOCS
        </StyledAnchor>
      </Box>
      <StyledAnchor href="https://github.com/albnnc/unnamed">
        GITHUB
      </StyledAnchor>
    </Box>
  );
};
