
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";
import { ThemeProvider } from "./components/ThemeProvider";
import { ViewProvider } from "./components/ViewContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light">
      <ViewProvider>
        <App />
      </ViewProvider>
    </ThemeProvider>
  </React.StrictMode>
);
