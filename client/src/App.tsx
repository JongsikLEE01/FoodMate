import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import MainPage from "./features/auth/pages/MainPage";
import KakaoCallback from "./features/auth/pages/KakaoCallback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/kakao/callback" element={<KakaoCallback />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
export {};