import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login"; 
import HomePage from "./pages/index";
import KakaoCallbackPage from "./pages/kakao/callback";
import ProfileSetup from "./pages/user/profile/ProfileSetup";
import UserInfoCheck from "./pages/user/info-check";
import { getAccessToken } from "./utils/tokenUtils";
import './styles/global.css';

// 1. 보호된 라우트 컴포넌트: 토큰 유무에 따라 접근을 제어
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // JWT 존재 여부로 로그인 상태 확인
    const isAuthenticated = !!getAccessToken(); 
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 2. 인증/콜백 경로: 토큰 없이 접근 허용 (로그인 관련 페이지) */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/oauth/kakao/callback" element={<KakaoCallbackPage />} />

                {/* 3. 사용자 정보 체크 페이지 */}
                <Route 
                    path="/user/info-check" 
                    element={
                        <ProtectedRoute>
                            <UserInfoCheck />
                        </ProtectedRoute>
                    }
                />

                {/* 4. 프로필 설정 페이지 */}
                <Route 
                    path="/user/profile-setup" 
                    element={
                        <ProtectedRoute>
                            <ProfileSetup />
                        </ProtectedRoute>
                    }
                />

                {/* 5. 메인 페이지 */}
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <HomePage /> 
                        </ProtectedRoute>
                    } 
                />
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;