import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <CssBaseline />
      <div>
        <App onContextMenu={(e)=> e.preventDefault()} />          {/*Prevent Default behaviour on right click*/}
      </div>
    </HelmetProvider>
  </React.StrictMode>
);
