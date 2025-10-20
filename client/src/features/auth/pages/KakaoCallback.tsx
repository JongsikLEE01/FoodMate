import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    const fetchToken = async () => {
      try {
        // 1️⃣ 인가코드 → 액세스토큰
        const tokenRes = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          new URLSearchParams({
            grant_type: "authorization_code",
            client_id: "카카오_REST_API_KEY",
            redirect_uri: "http://localhost:3000/kakao/callback",
            code: code || "",
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const accessToken = tokenRes.data.access_token;

        // 2️⃣ 백엔드에 전달
        const jwtRes = await axios.post("http://localhost:8080/users/kakao", {
          accessToken,
        });

        // 3️⃣ JWT 저장
        localStorage.setItem("jwt", jwtRes.data);

        navigate("/");
      } catch (err) {
        console.error(err);
      }
    };

    if (code) fetchToken();
  }, [navigate]);

  return <div>로그인 중입니다...</div>;
};

export default KakaoCallback;
