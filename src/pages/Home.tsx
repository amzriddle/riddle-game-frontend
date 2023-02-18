import React from "react";
import { CssBaseline, Box } from "@mui/material";

function Home() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <h1>Home</h1>
      </Box>
    </Box>
  );
}

export default Home;
