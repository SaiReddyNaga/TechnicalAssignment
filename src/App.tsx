import React from "react";
import { AppBar, ThemeProvider, Toolbar, Typography } from "@material-ui/core";
import { theme } from "./theme";


import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { MainScreen } from "./screens/mainScreen";
import { ResultScreen } from "./screens/resultScreen";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <MainScreen /> },
    { path: "result", element: <ResultScreen /> },
  ]);
  return routes;
};

export const App: React.FunctionComponent = () => {

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography>Technical Assignment</Typography>
          </Toolbar>
        </AppBar>

        <Router>
          <AppRoutes />
        </Router>

      </div>
    </ThemeProvider>
  );
};
