import React from "react";
import MiniDrawer from "./components/Menu";
import { AuthProvider } from './contexts/auth';

import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { createTheme } from "@mui/material";

const theme = createTheme();

function App() {
  return (
    <AuthProvider value={{signed: false}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MiniDrawer />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
