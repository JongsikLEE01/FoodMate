// src/pages/oauth/kakao/callback.tsx (Router의 쿼리 파라미터를 읽어오는 환경)

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // React Router Dom 기준
import { kakaoLogin } from '../../api/auth'; // 💡 auth.ts에서 정의한 함수 사용
import { setTokens } from '../../utils/tokenUtils';

const KakaoCallbackPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // URL에서 'code' 파라미터 추출
        const params = new URLSearchParams(location.search);
        const code = params.get('code');

        console.log(code)

        if (code) {
            // 1. auth.ts의 API 호출 함수 실행
            kakaoLogin(code)
                .then(tokens => {
                    // 2. JWT (Access/Refresh Token) 저장
                    setTokens(tokens.accessToken, tokens.refreshToken);
                    
                    // 3. 로그인 성공 후 메인 페이지로 이동
                    navigate('/'); 
                })
                .catch(error => {
                    console.error('JWT 발급 실패:', error);
                    // 에러 발생 시 로그인 페이지로 리다이렉트
                    navigate('/login', { state: { error: true } });
                });
        } else {
            // code가 없는 경우 (잘못된 접근)
            navigate('/login');
        }
    }, [location.search, navigate]);

    return (
        <div style={{ padding: '20px' }}>
            <p>카카오 로그인 처리 중입니다. 잠시만 기다려주세요...</p>
        </div>
    );
};

export default KakaoCallbackPage;