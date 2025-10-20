import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

declare global {
  interface Window {
    Kakao: any;
  }
}

// 1. window.Kakao가 존재하는지, 그리고 이미 초기화되지 않았는지 확인합니다.
if (window.Kakao && !window.Kakao.isInitialized()) {
  window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
  console.log("Kakao SDK initialized:", window.Kakao.isInitialized());
} else if (!window.Kakao) {
    // 2. Kakao 객체가 로드되지 않은 경우 (가장 흔한 원인)
    console.error("Kakao SDK is not loaded. Check your index.html script tag.");
}


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);