// 카카오 로그인 버튼
import React from 'react';

const KakaoLoginButton: React.FC = () => {

    // 1. Redirect URI 설정 (실제 값으로 대체)
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI || 'http://localhost:3000/oauth/kakao/callback';
    // 개발 중 문제 원인 진단을 위해 값 로깅
    console.log('Kakao redirect URI (from env):', REDIRECT_URI);
    console.log('Kakao JS Key present:', !!process.env.REACT_APP_KAKAO_JS_KEY);

    const handleLogin = () => {
        try {
            // 2. window.Kakao가 존재하고 초기화되었는지 다시 한번 확인
            if (window.Kakao && window.Kakao.isInitialized()) {
                    // redirectUri 검증: undefined 또는 잘못된 형식이면 에러 방지 및 안내
                    if (typeof REDIRECT_URI !== 'string' || !REDIRECT_URI.startsWith('http')) {
                        console.error('Invalid REDIRECT_URI for Kakao.Auth.authorize:', REDIRECT_URI);
                        alert('Redirect URI가 유효하지 않습니다. .env 파일과 카카오 개발자 콘솔의 Redirect URI 설정을 확인해주세요.\nCurrent: ' + REDIRECT_URI);
                        return;
                    }
                    window.Kakao.Auth.authorize({
                        redirectUri: REDIRECT_URI,
                    });
            } else {
                console.error("Kakao SDK가 준비되지 않았습니다. index.html를 확인해주세요.");
                alert("로그인 기능을 사용할 수 없습니다. 잠시 후 다시 시도해주세요.");
            }
        } catch (e) {
            // 3. 런타임 오류가 발생할 경우를 대비한 방어 코드
            console.error("카카오 로그인 중 오류 발생 ", e);
            alert("로그인 중 오류가 발생했습니다.");
        }
    };

    return (
        <button 
            onClick={handleLogin} 
        >
            카카오 로그인 시작
        </button>
    );
};

export default KakaoLoginButton;