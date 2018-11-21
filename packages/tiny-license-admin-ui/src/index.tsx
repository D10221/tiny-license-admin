import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { Route, Switch } from "react-router";
import { App } from "./app";
import "./fonts";
import { history, store } from "./store";
import theme from "./theme";
import { Home } from "./home";
import {
  Provider as AuthProvider,
  RequireAuth,
} from "./auth";
import { WithAuth as Login } from "./auth-ui-login";
import { WithAuth as AuthMenu } from "./auth-ui-menu";
import { WithAuth as ChangePassword } from "./auth-ui-change-password";
import { ConnectedRouter as Router } from "react-router-redux";
import { RouterProps, StaticRouterProps } from "react-router";
import { View as Validate } from "./api-validate";
// Hack to avoid editing/extending/adding-new  definition
const ConnectedRouter: React.ComponentType<RouterProps & StaticRouterProps> = Router;
const { PUBLIC_URL } = process.env;
/** */
ReactDOM.render(
  <StoreProvider store={store}>
    <AuthProvider>
      <MuiThemeProvider theme={theme}>
        <App
          history={history}
          toolbarMenu={
            <AuthMenu onRequestChangePassword={() => history.push("/change-password")} />
          }
        >
          <ConnectedRouter history={history} basename={PUBLIC_URL}>
            <Switch>
              <Route
                exact
                path={`${PUBLIC_URL}/`}
                render={() => {
                  return (
                    <RequireAuth
                      redirectTo={`${PUBLIC_URL}/login`}
                      renderBusy={() => (
                        <span>.... Auth busy, please wait </span>
                      )}
                    >
                      <Home />
                    </RequireAuth>
                  );
                }}
              />
              <Route exact path={`${PUBLIC_URL}/login`} component={Login} />
              <Route exact path={`${PUBLIC_URL}/logout`} component={Login} />
              <Route
                exact
                path={`${PUBLIC_URL}/change-password`}
                render={() => (
                  <RequireAuth redirectTo={`${PUBLIC_URL}/login`}>
                    <ChangePassword />
                  </RequireAuth>
                )}
              />
              <Route exact path={`${PUBLIC_URL}/validate/:token?`} render={(props) => {
                return <RequireAuth
                  redirectTo={`${PUBLIC_URL}/login`}
                  renderBusy={() => (
                    <span>.... Auth busy, please wait </span>
                  )}
                >
                  <Validate />
                </RequireAuth>
              }} />
            </Switch>
          </ConnectedRouter>
        </App>
      </MuiThemeProvider>
    </AuthProvider>
  </StoreProvider>,
  document.getElementById("root") as HTMLElement
);
