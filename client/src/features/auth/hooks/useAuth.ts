import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "../api/auth.api";

declare global {
  interface Window {
    Kakao: any;
  }
}

export const useKakaoLogin = () => {
  const navigate = useNavigate();

  const login = () => {
    window.Kakao.Auth.login({
      success: async (authObj: any) => {
        const { access_token } = authObj;
        const data = await kakaoLogin(access_token);
        localStorage.setItem("jwt", data.jwt);
        navigate("/");
      },
      fail: (err: any) => {
        console.error(err);
      },
    });
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
  }, []);

  return { login };
};
