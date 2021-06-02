import { NavAnchor, NavAnchorProps } from './NavAnchor';
import { Box } from './registry';

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
    <Box
      padding={{ vertical: '1.5rem', horizontal: 'large' }}
      direction="row"
      justify="between"
      align="center"
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
    </Box>
  );
};
