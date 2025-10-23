import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import styles from './index.module.css';

const HomePage: React.FC = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        
        // TODO: AI 채팅 API 호출 구현
        setMessage('');
    };

    return (
        <Layout>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.chatForm}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="메시지를 입력하세요..."
                        className={styles.input}
                    />
                    <button type="submit" className={styles.sendButton}>
                        전송
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default HomePage;