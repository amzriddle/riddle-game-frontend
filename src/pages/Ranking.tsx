import React from "react";
import { CssBaseline, Box } from "@mui/material";

function Ranking() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <h1>Ranking</h1>
      </Box>
    </Box>
  );
}

export default Ranking;
