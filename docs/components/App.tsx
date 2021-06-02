import { jsx } from '@emotion/core';
import { system, theme } from 'docs/core';
import { injectGlobal } from 'emotion';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { DocsPage, LandingPage } from './pages';
import { SystemContext } from './shared';

injectGlobal`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    color: ${theme.variables?.palette?.text};
    line-height: 1.5;
  }
`;

export const App = () => {
  return (
    <SystemContext.Provider value={system}>
      <BrowserRouter basename={process.env.BASE_URL}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/docs/" component={DocsPage} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </SystemContext.Provider>
  );
};
