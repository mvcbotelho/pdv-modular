import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { globalStyles } from "@/styles/stitches.config";

globalStyles(); // ← importante

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
