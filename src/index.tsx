import React from "react";
import { WordleContextProvider } from "./WordleContext";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <WordleContextProvider>
      <App />
    </WordleContextProvider>
  </React.StrictMode>
);
