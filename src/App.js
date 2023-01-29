import React from 'react'
import {
  BrowserRouter,
} from "react-router-dom";

import MiniDrawer from "./Components/Menu";

function App() {
  return (
    <>
      <BrowserRouter>
         <MiniDrawer />
      </BrowserRouter>
    </>
  );
}

export default App;
