// Router의 쿼리 파라미터를 읽어오기
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { kakaoLogin } from '../../api/auth';
import { setTokens } from '../../utils/tokenUtils';

const KakaoCallbackPage: React.FC = () => {
    const check = useRef(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // 중복실행방지
        if (check.current) return;
        check.current = true;

        // URL에서 파라미터 추출
        const params = new URLSearchParams(location.search);
        const code = params.get('code');

        if (code) {
            // 1. auth.ts의 API 호출 함수 실행
            kakaoLogin(code)
                .then(response => {
                    // 2. JWT 저장
                    setTokens(response.accessToken, response.refreshToken);
                    
                    // 3. 로그인 성공 시 항상 사용자 정보 체크 페이지로 이동
                    navigate('/user/info-check');
                })
                .catch(() => {
                    // 에러 발생 시 로그인 페이지 리다이렉트
                    navigate('/login', { state: { error: true } });
                });
        } else {
            // 잘못된 접근
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