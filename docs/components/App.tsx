import { getTheme } from 'docs/core';
import { injectGlobal } from 'emotion';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { DocsPage, LandingPage } from './pages';

injectGlobal`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    min-height: 100%;
    color: ${getTheme().variables?.palette?.text};
  }
`;

export const App = () => {
  return (
    <BrowserRouter basename={process.env.BASE_URL}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/docs/" component={DocsPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};
