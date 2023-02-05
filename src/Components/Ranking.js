import React from "react";
import { CssBaseline, Box } from "@mui/material";
import { DrawerHeader } from "./Menu";

function Ranking() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <h1>Ranking</h1>
      </Box>
    </Box>
  );
}

export default Ranking;
