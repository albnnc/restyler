import { Navbar } from 'docs/components/shared';
import {
  Box,
  Container,
  Heading,
  Menu,
  MenuGroup,
  MenuItem
} from 'docs/components/shared';
import { capitalizeFirst } from 'lib';
import { useEffect, useState, Fragment } from 'react';
import {
  useHistory,
  useRouteMatch,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { DocsMenu } from './DocsMenu';
import { groups } from './groups';
import { useDocsRoute } from './useDocsRoute';

export const DocsPage = () => {
  const { title } = useDocsRoute();

  return (
    <Fragment>
      <Navbar />
      <Container background="darkerGrey" padding={{ vertical: 'larger' }}>
        <Heading kind="1" color="white" margin="none">
          {title}
        </Heading>
      </Container>
      <Container padding={{ vertical: 'larger' }}>
        <Box margin="-1rem" direction="row" wrap="reverse">
          <Box
            css={{
              margin: '1rem',
              flex: '100 1 300px',
              maxWidth: '100%'
            }}
          >
            <Switch>
              {groups
                .reduce((prev, curr) => [...prev, ...curr.items], [])
                .map(item => (
                  <Route
                    key={item.path}
                    path={item.path}
                    component={item.component}
                  />
                ))}
              <Redirect to="/docs/general/introduction" />
            </Switch>
          </Box>
          <DocsMenu />
        </Box>
      </Container>
    </Fragment>
  );
};
