import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/login"; 
import HomePage from "./pages/index";
import KakaoCallbackPage from "./pages/kakao/callback";
import ProfileSetup from "./pages/user/profile/ProfileSetup";
import UserInfoCheck from "./pages/user/infoCheck";
import { getAccessToken } from "./utils/tokenUtils";
import './styles/global.css';
import { CoinProvider } from './hooks/Coin';
import { ModalProvider } from './components/common/Modal/ModalProvider'; // index.ts에서 import
import TestModal from './components/testmodal';


// 토큰 유무에 따라 접근을 제어
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // JWT 존재 여부로 로그인 상태 확인
    const isAuthenticated = !!getAccessToken(); 
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
    return (
        <CoinProvider>
            <BrowserRouter>
                <ModalProvider>
                    <Routes>
                        
                        {/* 로그인 관련 페이지(토큰 없이 접근 허용) */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/oauth/kakao/callback" element={<KakaoCallbackPage />} />
                        
                        {/* 사용자 정보 체크 페이지 */}
                        <Route path="/user/info-check"
                            element={
                                <ProtectedRoute>
                                    <UserInfoCheck />
                                </ProtectedRoute>
                            }
                        />

                        {/* 프로필 설정 페이지 */}
                        <Route path="/user/profile-setup" 
                            element={
                                <ProtectedRoute>
                                    <ProfileSetup />
                                </ProtectedRoute>
                            }
                        />

                        {/* 메인 페이지 */}
                        <Route path="/" 
                            element={
                                <ProtectedRoute>
                                    <HomePage /> 
                                </ProtectedRoute>
                            } 
                        />
                        
                    </Routes>
                    {/* 모달 테스트용 */}
                    {/* <TestModal />  */}
                </ModalProvider>
            </BrowserRouter>
        </CoinProvider>
    );
}

export default App;