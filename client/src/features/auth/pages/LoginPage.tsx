import React from 'react';
import axios from 'axios'

const LoginPage: React.FC = () => {
  const handleKakaoLogin = async () => {
    try {
      const kakao = (window as any).Kakao;
      kakao.Auth.login({
        success: async (authObj: any) => {
          const response = await axios.post('http://localhost:8080/auth/kakao', {
            accessToken: authObj.access_token,
          });
          localStorage.setItem('token', response.data.token);
          alert(`${response.data.user.userName}님 환영합니다!`);
          window.location.href = '/main';
        },
        fail: () => {
          alert('카카오 로그인 실패. 다시 시도해주세요.');
        },
      });
    } catch (error) {
      alert('서버 오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4 font-bold">FoodMate 로그인</h2>
      <button
        onClick={handleKakaoLogin}
        className="bg-yellow-400 text-black px-6 py-2 rounded-xl shadow-md hover:bg-yellow-300"
      >
        카카오로 로그인
      </button>
    </div>
  );
};

export default LoginPage;
