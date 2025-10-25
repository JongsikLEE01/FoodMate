import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/common/Layout/Layout';
import ChatMessages from '../components/index/ChatMessages';
import ChatInput from '../components/index/ChatInput';
import styles from './css/index.module.css';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const HomePage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: '안녕하세요! 무엇을 도와드릴까요?', isUser: false, timestamp: '오후 2:30' },
    { id: 2, text: '채팅 테스트입니다', isUser: true, timestamp: '오후 2:31' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    
    // TODO: AI 채팅 API 호출 구현
  };

  return (
    <Layout>
      <div className={styles.container}>
        <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />

        <ChatInput 
          message={message}
          setMessage={setMessage}
          onSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
};

export default HomePage;