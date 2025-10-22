// 카카오 로그인 버튼
import React from 'react';
import KakaoLogin from '../../assets/images/kakao_login.png';

const KakaoLoginButton: React.FC = () => {

    // 1. Redirect URI 설정
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI!;

    const handleLogin = () => {
        try {
            // 2. window.Kakao가 존재하고 초기화되었는지 다시 한번 확인
            if (window.Kakao && window.Kakao.isInitialized()) {
                    // redirectUri 검증
                    if (typeof REDIRECT_URI !== 'string' || !REDIRECT_URI.startsWith('http')) {
                        console.error('REDIRECT URI이 유효하지않습니다.');
                        return;
                    }
                    window.Kakao.Auth.authorize({
                        redirectUri: REDIRECT_URI,
                    });
            } else {
                console.error("Kakao SDK가 준비되지 않았습니다..");
                alert("로그인 중 오류가 발생했습니다.");
            }
        } catch (e) {
            // 3. 런타임 오류가 발생할 경우 대비
            console.error("카카오 로그인 중 오류 발생 ", e);
            alert("로그인 중 오류가 발생했습니다.");
        }
    };

    return (
            <img src={KakaoLogin} onClick={handleLogin}/>
    );
};

export default KakaoLoginButton;