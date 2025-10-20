// 카카오 로그인, 토큰 재발급 등 인증 관련 API 함수
import axios from 'axios';

interface JwtResponse {
    accessToken: string;
    refreshToken: string;
}

// 카카오 인가 코드를 백엔드로 전송하여 JWT를 발급받는 함수
export const kakaoLogin = async (code: string): Promise<JwtResponse> => {
    try {
        const response = await axios.post('/api/v1/auth/kakao/callback', { code }); 
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error("네트워크 오류 또는 CORS 정책 문제로 서버에 연결할 수 없습니다."); 
    }
};