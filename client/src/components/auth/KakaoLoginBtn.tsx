// 카카오 로그인 버튼
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { kakaoLogin } from '../../api/auth';
import { setTokens } from '../../utils/tokenUtils';

const KakaoLoginButton: React.FC = () => {

    // 💡 1. Redirect URI 설정 (실제 값으로 대체)
    const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback"; 
    // 참고: App.tsx의 <Route path="/oauth/kakao/callback" ... />와 일치해야 합니다.

    const handleLogin = () => {
        try {
            // 💡 2. window.Kakao가 존재하고 초기화되었는지 다시 한번 확인
            if (window.Kakao && window.Kakao.isInitialized()) {
                window.Kakao.Auth.authorize({
                    redirectUri: REDIRECT_URI,
                });
            } else {
                console.error("Kakao SDK가 준비되지 않았습니다. index.html 및 index.tsx 확인 필요.");
                alert("로그인 기능을 사용할 수 없습니다. 잠시 후 다시 시도해주세요.");
            }
        } catch (e) {
            // 💡 3. 호출 중 예상치 못한 런타임 오류가 발생할 경우를 대비한 방어 코드
            console.error("카카오 로그인 버튼 클릭 중 오류 발생:", e);
            alert("로그인 중 오류가 발생했습니다.");
        }
    };

    return (
        <button 
            onClick={handleLogin} 
            // 💡 4. 버튼의 렌더링 자체에 문제가 없는지 확인하기 위해 인라인 스타일 제거
            // className="kakao-login-button" 
        >
            카카오 로그인 시작
        </button>
    );
};

export default KakaoLoginButton;