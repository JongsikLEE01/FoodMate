import { useState, useRef, useEffect, useCallback } from 'react';
import { sendUserMessage, userChatResponse, userChatRequest, getChatHistory } from '../api/chat'; 
import { getUserNumFromToken } from '../api/auth';
import { useCoin } from './Coin';
import axios from 'axios';
import { showAlert, showConfirm } from '../utils/modalUtil'; 
import { useNavigate } from 'react-router-dom'; 

export interface Message extends Omit<userChatResponse, 'userNum'> {} 

// 첫 화면 메시지
const initMessages: Message[] = [
    { chatId: 1, message: '안녕하세요! 저는 맞춤형 식단 추천 AI 푸드메이트입니다. 무엇을 도와드릴까요?', senderType: 'AI', sendDt: new Date().toISOString() },
];

// 채팅 로직
export const useChatLogic = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userNum, setUserNum] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { coin, setCoin } = useCoin();
    const navigate = useNavigate(); 

    // 스크롤 함수
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // 초기 로드 및 스크롤 처리
    useEffect(() => {
        // 사용자 번호 로드 및 인증 확인
        const num = getUserNumFromToken();
        if (num !== null) {
            setUserNum(num);
        } else {
            console.error("사용자 정보를 확인할 수 없어 채팅을 시작할 수 없습니다.");
            setMessages(initMessages);
            return;
        }

        // 유저 메시지 가져오기
        const getHistory = async (userNum: number) => {
            try {
                const history = await getChatHistory(userNum);
                
                if (history && history.length > 0) {
                    const forHistory: Message[] = history.map(log => ({
                        chatId: log.chatId,
                        message: log.message,
                        senderType: log.senderType,
                        sendDt: log.sendDt
                    }));
                    setMessages(forHistory);
                } else {
                    setMessages(initMessages);
                }
            } catch (e) {
                console.error('채팅기록 로드 실패', e);
                setMessages(initMessages);
            }
        };

        // userNum이 유효할 때만 기록 조회 실행
        if (num !== null) {
            getHistory(num);
        }
        
    }, []);

    // 메시지 업데이트될 때마다 스크롤
    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // 메시지 전송
    const handleSubmit = useCallback(async () => {
        // 유효성 검사
        if (!message.trim() || isLoading || userNum === null) {
            const goToLogin = await showConfirm(
                "다시 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?", 
                '로그인',
            );

            if (goToLogin) navigate('/login');
            return;
        }

        if (coin != null && coin <= 0) {
            const goToCharge = await showConfirm(
                "채팅을 이용하려면 코인이 필요합니다. 충전 페이지로 이동하시겠습니까?", 
                '코인 부족',
            );

            if (goToCharge) navigate('/charge'); // TODO : 충전 페이지 경로 변경 필요
            return;
        }
        
        const userMessageText = message.trim();
        const MAX_LENGTH = 100;

        if (userMessageText.length > MAX_LENGTH) {
            await showAlert(`메시지는 ${MAX_LENGTH}자를 초과할 수 없습니다.`, 'error', '입력 제한');
            return;
        }

        setMessage('');
        setIsLoading(true);

        // 사용자 메시지를 즉시 반영
        const optimisticMessage: Message = {
            chatId: Date.now(), 
            message: userMessageText,
            senderType: 'USER',
            sendDt: new Date().toISOString()
        };
        setMessages(prev => [...prev, optimisticMessage]);

        // 사용자 질문 DB 저장 및 AI 응답 요청
        try {
            const requestData: userChatRequest = {
                userNum: userNum,
                message: userMessageText,
            };

            const responseLog: userChatResponse = await sendUserMessage(requestData); 
            const finalLog: Message = { 
                chatId: responseLog.chatId,
                message: responseLog.message,
                senderType: responseLog.senderType,
                sendDt: responseLog.sendDt,
            };
            
            // 채팅 성공 시 코인 잔액 감소
            setCoin(prev => {
                if(prev === null || prev === 0 ) return 0;
                return prev - 1;
            })

            setMessages(prev => {
                return [...prev, finalLog];
            });
            
            // 💡 TODO: 이어서 AI 응답을 요청하는 로직을 추가해야 합니다. (이 주석은 유지)

        } catch (e) {
            console.error("질문 전송 오류:", e);
            let errorMsg = "메시지를 저장하지 못했습니다. 다시 시도해 주세요.";
            if (axios.isAxiosError(e) && e.response) {
                const responseData = e.response.data;
                
                // 백엔드 호출에 따른 에러 처리
                if (typeof responseData === 'string' && responseData.includes("코인이 부족합니다.")) {
                    errorMsg = responseData;
                } else if (responseData && responseData.message) {
                    errorMsg = responseData.message; 
                }
            }

            // 메시지 복구 및 낙관적 메시지 제거
            setMessage(userMessageText);
            setMessages(prev => prev.filter(msg => msg.chatId !== optimisticMessage.chatId)); 
            
            await showAlert(errorMsg, 'error', '전송 실패'); 
        } finally {
            setIsLoading(false);
        }
    }, [message, isLoading, userNum, coin, setCoin, navigate]); // navigate를 의존성 배열에 추가

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