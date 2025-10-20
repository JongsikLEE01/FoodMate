import React, { useEffect } from 'react';
import axios from 'axios';

const MainPage: React.FC = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }

    axios.get('http://localhost:8080/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {
      alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold">메인 페이지</h2>
      <p className="mt-2">로그인 성공!</p>
    </div>
  );
};

export default MainPage;
