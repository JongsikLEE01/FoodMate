import { useState, useRef, useEffect, useCallback } from 'react';
import { sendUserMessage, userChatResponse, userChatRequest } from '../api/chat'; 
import { getUserNumFromToken } from '../api/auth'; // JWT userNum 추출 함수

// 1. 타
export interface Message extends Omit<userChatResponse, 'userNum'> {} 

// 테스트용 더미 메시지
const initialMessages: Message[] = [
    { chatId: 1, message: '안녕하세요! 저는 맞춤형 식단 추천 AI 푸드메이트입니다. 무엇을 도와드릴까요?', senderType: 'AI', sendDt: new Date().toISOString() },
];

// 2. 챗 로직 훅
export const useChatLogic = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userNum, setUserNum] = useState<number | null>(null);    // JWT에서 추출한 userNum 
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 스크롤 함수
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // 초기 로드 및 스크롤 처리
    useEffect(() => {
        // 1. 사용자 번호 로드 및 인증 확인
        const num = getUserNumFromToken();
        if (num !== null) {
            setUserNum(num);
        } else {
            console.error("사용자 정보를 확인할 수 없어 채팅을 시작할 수 없습니다. (토큰 없음/만료)");
            //  TODO 실제 구현: 로그인 페이지로 리디렉션 로직 추가
        }

        //  TODO 2. 초기 메시지 로드 (인증 후 기존 로그 API 호출로 대체 필요)
        if (messages.length === 0) {
             setMessages(initialMessages); 
        }

        // 3. 메시지 업데이트될 때마다 스크롤
        scrollToBottom();
        
    }, [messages, scrollToBottom]); 

    // 메시지 전송
    const handleSubmit = useCallback(async () => {
        // 1. 유효성 검사
        if (!message.trim() || isLoading || userNum === null) {
            if (userNum === null) alert("사용자 정보가 없어 메시지를 보낼 수 없습니다.");
            return;
        }

        const userMessageText = message.trim();
        setMessage('');
        setIsLoading(true);

        // 2. 사용자 메시지를 로컬에 즉시 반영
        const optimisticMessage: Message = {
            chatId: Date.now(), 
            message: userMessageText,
            senderType: 'USER',
            sendDt: new Date().toISOString()
        };
        setMessages(prev => [...prev, optimisticMessage]);

        // 3. 사용자 질문 DB 저장
        try {
            const requestData: userChatRequest = {
                userNum: userNum,
                message: userMessageText,
            };
            
            // sendUserMessage 호출
            const responseLogs: userChatResponse[] = await sendUserMessage(requestData); 

            // 4. 서버 응답으로 로컬 메시지 업데이트
            setMessages(prev => {
                // 메시지 제거
                const updatedMessages = prev.filter(msg => msg.chatId !== optimisticMessage.chatId);
                
                // 서버에서 받은 최종 로그를 Message 타입으로 변환 및 추가
                const finalLogs: Message[] = responseLogs.map(log => ({
                    chatId: log.chatId,
                    message: log.message,
                    senderType: log.senderType,
                    sendDt: log.sendDt,
                }));

                return [...updatedMessages, ...finalLogs];
            });
            
            // 💡 TODO: 이어서 AI 응답을 요청하는 로직을 추가해야 합니다.

        } catch (error) {
            console.error("질문 전송 오류:", error);
            setMessage(userMessageText); // 실패 시 메시지 복원
            setMessages(prev => prev.filter(msg => msg.chatId !== optimisticMessage.chatId)); // 낙관적 업데이트 제거
            alert("메시지를 저장하지 못했습니다. 다시 시도해 주세요.");
        } finally {
            setIsLoading(false);
        }
    }, [message, isLoading, userNum]); 

    return {
        messages,
        message,
        messagesEndRef,
        isLoading,
        setMessage,
        handleSubmit,
        userNum
    };
};