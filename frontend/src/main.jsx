import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: "10px",
          fontFamily: "Bahnschrift, Segoe UI, system-ui, sans-serif",
          background: "#ffffff",
          color: "#09090b",
          border: "1px solid #dc2626",
        },
      }}
    />
  </React.StrictMode>
);
