import React from "react";
import axios from "axios";

const KakaoLoginBtn = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_KEY;
  const REDIRECT_URI = "http://localhost:3000/kakao/callback";

  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  return (
    <button onClick={handleLogin} style={{ backgroundColor: "#FEE500" }}>
      카카오로 로그인
    </button>
  );
};

export default KakaoLoginBtn;
