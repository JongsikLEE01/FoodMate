// 유저 정보 설정 API 함수
import axios from 'axios';

// 유저 검색
// TODO : ProfileSetup.tsx:34 유저 정보 조회 실패 
export const selectUser = async (data : {userNum : number}) => {
    const res = await axios.get(`/user/profile/${data.userNum}`);
    return res.data;
}

// 유저 정보 추가
export const createUserDetail = async (data : any) => {
    const res = await axios.post('/user/profile', data);
    return res.data;
}

// 유저 정보 수정
export const updateUserDetail = async (data : any) => {
    const res = await axios.patch('/user/profile', data);
    return res.data;
}