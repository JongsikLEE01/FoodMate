import React from 'react';
import Layout from '../components/common/Layout/Layout';
import ChatMessages from '../components/index/ChatMessages';
import ChatInput from '../components/index/ChatInput';
import { useChatLogic } from '../hooks/Chat';
import styles from './css/index.module.css';

const HomePage: React.FC = () => {
    // 로직과 상태를 훅으로 가져오기.
    const {
        messages,
        message,
        messagesEndRef,
        isLoading,
        setMessage,
        handleSubmit,
    } = useChatLogic();

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.messagesContainer}>
                    <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />
                    <div ref={messagesEndRef} /> 
                    
                    {/* 로딩 인디케이터를 사용한다면 여기서 렌더링 (현재는 로직이 없으므로 생략 가능) */}
                    {/* {isLoading && <div className={styles.loadingIndicator}>...</div>} */}
                </div>
              
                <ChatInput 
                    message={message}
                    setMessage={setMessage}
                    onSubmit={handleSubmit}
                    // isDisabled={isLoading} // 로딩 상태를 입력 비활성화에 사용
                />
            </div>
        </Layout>
    );
};

export default HomePage;