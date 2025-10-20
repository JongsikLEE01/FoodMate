// 로그인 페이지
import React from 'react';
import KakaoLoginButton from '../components/auth/KakaoLoginBtn';

const login: React.FC = () => {
    return (
        <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>
            {<KakaoLoginButton />}
        </div>
    );
};

export default login;