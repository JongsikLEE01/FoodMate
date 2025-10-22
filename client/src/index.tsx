import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

declare global {
  interface Window {
    Kakao: any;
  }
}

// Kakao SDK 초기화
if (window.Kakao && !window.Kakao.isInitialized()) {
    const kakaoJsKey = process.env.REACT_APP_KAKAO_JS_KEY;
    if (kakaoJsKey) {
        window.Kakao.init(kakaoJsKey);
    }
}


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);