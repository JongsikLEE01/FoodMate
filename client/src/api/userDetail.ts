// 유저 정보 설정 API 함수
import axios from 'axios';
import { getAccessToken } from './auth';

// 유저 검색
export const selectUser = async () => {
  const token = getAccessToken();
  if (!token) throw new Error("JWT 토큰이 없습니다.");

  console.log(token)

  const res = await axios.get("http://localhost:8080/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// 유저 정보 저장
export const saveUserDetail = async (data: any) => {
  const token = getAccessToken();
  if (!token) throw new Error("JWT 토큰이 없습니다.");

  const res = await axios.post('http://localhost:8080/user/profile', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};