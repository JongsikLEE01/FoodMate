// 채팅 정보 API 함수
import axios from "axios";
import { getAccessToken } from './auth';

export interface userChatResponse{
    userNum : number;
    chatId : number;
    message : string;
    senderType: 'USER' | 'AI' | 'JSON';
    sendDt : string;
}

// 사용자 질문 저장용
export interface userChatRequest{
    userNum : number;
    message : string;
}

// 유저 번호 기반 채팅 가져오기
export const getChatHistory = async (userNum: number): Promise<userChatResponse[]> => {
    const token = getAccessToken();
    if (!token) throw new Error("JWT 토큰이 없습니다.");

    try {
        const res = await axios.get<userChatResponse[]>(`http://localhost:8080/chat/history`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
        });
        return res.data;
    } catch (e) {
        console.error("채팅 기록 로드 실패:", e);
        // 오류가 발생해도 최소한 빈 배열을 반환
        return []; 
    }
};


// 사용자 질문 저장 함수
export const sendUserMessage = async (data : userChatRequest) : Promise<userChatResponse[]> => {
    const token = getAccessToken();
    if (!token) throw new Error("JWT 토큰이 없습니다.");

    try{        
        const res = await axios.post<userChatResponse[]>('http://localhost:8080/chat/question', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (e) {
        console.log("채팅메세지 전송 중 오류 발생 : ", e);
        throw new Error("채팅서버와 통신 불가...");
    }
}