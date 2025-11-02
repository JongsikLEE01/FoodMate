import React from 'react';
import KakaoLogin from '../../assets/images/kakao_login.png';
import { showAlert } from '../../utils/modalUtil'; 
import { useNavigate } from 'react-router-dom'; 

const KakaoLoginButton: React.FC = () => {
    // Redirect URI 설정
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI!;
    
    const handleLogin = async () => {
        try {
            // window.Kakao가 존재하고 초기화되었는지 다시 한번 확인
            if (window.Kakao && window.Kakao.isInitialized()) {
                // redirectUri 검증
                if (typeof REDIRECT_URI !== 'string' || !REDIRECT_URI.startsWith('http')) {
                    console.error('REDIRECT URI이 유효하지않습니다.');
                    await showAlert("로그인 중 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", 'error', '로그인 오류');
                    return;
                }
                window.Kakao.Auth.authorize({
                    redirectUri: REDIRECT_URI,
                });
            } else {
                console.error("Kakao SDK가 준비되지 않았습니다..");
                await showAlert("로그인 중 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", 'error', '로그인 오류');
            }
        } catch (e) {
            console.error("카카오 로그인 중 런타임 오류 발생 ", e);
            await showAlert("로그인 중 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", 'error', '로그인 오류');
        }
    };

    return (
        <img src={KakaoLogin} onClick={handleLogin} alt="카카오 로그인" style={{ cursor: 'pointer' }}/>
    );
};

export default KakaoLoginButton;