import axios from "axios";

export interface userChatResponse{
    userNum : number;
    chatId : number;
    message : string;
    senderType: 'USER' | 'AI' | 'JSON';
    sendDt : string;
}

// 사용자 질문 저장
export interface userChatRequest{
    userNum : number;
    message : string;
}

export const sendUserMessage = async (data : userChatRequest) : Promise<userChatResponse[]> => {
    try{
        const res = await axios.post<userChatResponse[]>('http://localhost:8080/chat/question', data);
        return res.data;
    } catch (e) {
        console.log("채팅메세지 전송 중 오류 발생 : ", e);
        throw new Error("채팅서버와 통신 불가...");
    }
}