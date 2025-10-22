import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import styles from './index.module.css';

const HomePage: React.FC = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: API 호출 구현
        setMessage('');
    };

    return (
        <Layout title="푸드메이트" showBack={false}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.messageForm}>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="메시지를 입력하세요..."
                        className={styles.textarea}
                    />
                    <button type="submit" className={styles.button}>
                        전송
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default HomePage;