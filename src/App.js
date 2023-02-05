import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { createTheme } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import MiniDrawer from "./Components/Menu";
const theme = createTheme();

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MiniDrawer />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
