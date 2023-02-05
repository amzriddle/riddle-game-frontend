import React from "react";
import MiniDrawer from "./Components/Menu";

import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { createTheme } from "@mui/material";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MiniDrawer />
    </ThemeProvider>
  );
}

export default App;
