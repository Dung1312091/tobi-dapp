import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WalletProvider } from "./contexts/WalletProvider.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WalletProvider>
      <App />
      <ToastContainer
        pauseOnHover
        position="bottom-right"
        closeOnClick
        autoClose={60000}
      />
    </WalletProvider>
  </React.StrictMode>
);
