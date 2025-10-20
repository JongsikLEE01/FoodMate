// 메인 페이지
import React from 'react';
import KakaoLoginButton from '../components/auth/KakaoLoginBtn'; 

const LoginPage: React.FC = () => {
    
    // 카카오 로그인 버튼 컴포넌트만 배치
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h2>소셜 로그인</h2>
            <p>카카오 계정으로 간편하게 시작하세요.</p>
            <KakaoLoginButton /> 
        </div>
    );
};

export default LoginPage;