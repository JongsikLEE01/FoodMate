// 카카오 로그인, 토큰 재발급 등 인증 관련 API 함수
import axios from 'axios';

interface UserInfo {
    userNum: number;
    userId: string;
    userAge?: number;
    disease?: string;
    familyHistory?: string;
    allergy?: string;
}

interface JwtResponse {
    accessToken: string;
    refreshToken: string;
    isNewUser: boolean;
    userInfo: UserInfo;
}

// 카카오 인가 코드를 백엔드로 전송하여 JWT를 발급받는 함수
export const kakaoLogin = async (code: string): Promise<JwtResponse> => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/kakao/callback', { code }, { withCredentials : true}); 

        return response.data;
    } catch (error) {
        console.log(error);

        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error("네트워크 오류 또는 CORS 정책 문제로 서버에 연결할 수 없습니다."); 
    }
};

// JWT 토큰 가져오기(localStorage)
export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const getUserNumFromToken = (): number | null => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub;
  } catch (err) {
    console.error("토큰 파싱 실패", err);
    return null;
  }
};