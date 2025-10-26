import axios from "axios";

export interface ChatResponse{
    userNum : number;
    chatId : number;
    message : string;
    senderType: 'USER' | 'AI' | 'JSON';
    sendDt : string;
}

// 사용자 질문 저장
export interface ChatRequest{
    userNum : number;
    message : string;
    senderType : 'USER';
}

export const sendMessage = async (data : ChatRequest) : Promise<ChatResponse[]> => {
    try{
        const res = await axios.post<ChatResponse[]>('http://localhost:8080/chat', data);
        return res.data;
    } catch (e) {
        console.log("채팅메세지 전송 중 오류 발생 : ", e);
        throw new Error("채팅서버와 통신 불가...");
    }
}