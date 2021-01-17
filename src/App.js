import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { darkTheme, lightTheme } from "./themes/themes";
import { useDarkMode, useAuth } from "./state";
import {
  LOGGED_IN_DEFAULT_LAYOUT_ROUTES,
  LOGGED_OUT_NO_LAYOUT_ROUTES,
} from "./routing/routes";

function App() {
  const isDarkMode = useDarkMode((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const isLoggedIn = useAuth((state) => state.isLoggedIn);

  const defaultLayoutPaths = LOGGED_IN_DEFAULT_LAYOUT_ROUTES.map(
    (item) => item.path
  );
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {isLoggedIn && (
          <Switch>
            <Route path={defaultLayoutPaths} exact>
              {LOGGED_IN_DEFAULT_LAYOUT_ROUTES.map((item) => {
                return (
                  <Route
                    key={item.path}
                    component={item.component}
                    path={item.path}
                    exact={item.exact}
                  />
                );
              })}
            </Route>
            <Route
              path={["/signup", "/login"]}
              component={() => <Redirect to="/" />}
            />
          </Switch>
        )}
        {!isLoggedIn && (
          <Switch>
            {LOGGED_OUT_NO_LAYOUT_ROUTES.map((item) => {
              return (
                <Route
                  key={item.path}
                  component={item.component}
                  path={item.path}
                  exact={item.exact}
                />
              );
            })}
          </Switch>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
