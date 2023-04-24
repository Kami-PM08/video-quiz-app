import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Components
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/Router";
// Context
import VideoQuizzesProvider from "./context/VideoQuizzesProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VideoQuizzesProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </VideoQuizzesProvider>
  </React.StrictMode>
);
