import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

declare global {
  interface Window {
    Kakao: any;
  }
}

if (!window.Kakao.isInitialized()) {
  window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);