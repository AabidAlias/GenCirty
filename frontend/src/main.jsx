import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "10px",
            fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif",
            background: "#111111",
            color: "#ffffff",
            border: "1px solid #dc2626",
          },
        }}
      />
    </HelmetProvider>
  </React.StrictMode>
);
