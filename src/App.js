import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Home from "./features/home/Home";
import Login from "./features/login/Login";
import Signup from "./features/signup/Signup";
import { darkTheme, lightTheme } from "./themes/themes";
import { useDarkMode } from "./state";

function App() {
  const isDarkMode = useDarkMode((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
