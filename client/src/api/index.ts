// axios 인스턴스 및 설정
import axios, { AxiosInstance } from 'axios';
import { getAccessToken, removeTokens } from '../utils/tokenUtils';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// 요청 인터셉터: 모든 요청에 Access Token 첨부
axiosInstance.interceptors.request.use(config => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 응답 인터셉터: 401 에러 처리
axiosInstance.interceptors.response.use(response => response, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        // 재발급 실패 시 removeTokens() 호출 및 로그인 페이지로 리다이렉트
        removeTokens();
        window.location.href = '/login'; 
    }
    return Promise.reject(error);
});