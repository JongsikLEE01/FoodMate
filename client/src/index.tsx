import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

declare global {
  interface Window {
    Kakao: any;
  }
}

// 1. window.Kakao가 존재하는지 이미 초기화되지 않았는지 확인
if (window.Kakao && !window.Kakao.isInitialized()) {
  // Use JavaScript Key from env
  const kakaoJsKey = process.env.REACT_APP_KAKAO_JS_KEY;
  if (!kakaoJsKey) {
    console.error('REACT_APP_KAKAO_JS_KEY가 설정되어 있지 않습니다. .env 파일을 확인하세요.');
  } else {
    window.Kakao.init(kakaoJsKey);
    console.log('Kakao SDK가 로드되었습니다. isInitialized=', window.Kakao.isInitialized());
  }
} else if (!window.Kakao) {
    console.error("Kakao SDK가 로드되지 않았습니다.");
}


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);