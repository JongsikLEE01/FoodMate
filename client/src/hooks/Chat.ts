import { useState, useRef, useEffect, useCallback } from 'react';

// 메시지 타입 정의 (별도 파일에 있다면 import 하세요)
interface Message {
    id: number;
    text: string;
    isUser: boolean;
    timestamp: string;
}

const initialMessages: Message[] = [
    { id: 1, text: '안녕하세요! 무엇을 도와드릴까요?', isUser: false, timestamp: '오후 2:30' },
    { id: 2, text: '채팅 테스트입니다', isUser: true, timestamp: '오후 2:31' }
];

export const useChatLogic = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    
    // 로딩 상태는 API 연동 시 필요하지만, 현재는 더미로 유지 (입력 비활성화에 사용 가능)
    const [isLoading, setIsLoading] = useState(false); 
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 스크롤 함수 (useCallback으로 메모이제이션)
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // 메시지가 업데이트될 때마다 스크롤
    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // 메시지 전송 핸들러 (useCallback으로 메모이제이션)
    const handleSubmit = useCallback(() => {
        if (!message.trim()) return;

        const newMessage: Message = {
            // id를 messages.length + 1 대신 Date.now()를 사용하는 것이 더 안전합니다.
            id: Date.now(), 
            text: message,
            isUser: true,
            timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMessage]);
        setMessage('');
        
        // TODO: 백엔드/AI 연동 로직은 이곳에 구현될 예정입니다.
        
    }, [message]); // message 상태가 변경될 때마다 함수 재생성

    return {
        messages,
        message,
        messagesEndRef,
        isLoading,
        setMessage,
        handleSubmit,
    };
};