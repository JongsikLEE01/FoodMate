import React, { RefObject } from 'react';
import { formatTime } from '../../utils/dateFormat';
import { Message } from '../../hooks/Chat';
import styles from './css/ChatMessages.module.css';

interface ChatMessagesProps {
    messages: Message[]; 
    messagesEndRef: RefObject<HTMLDivElement | null>; 
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, messagesEndRef }) => {
    
    return (
        <div className={styles.messagesWrapper}>
            {messages.map((msg, index) => {
                const isUser = msg.senderType === 'USER';
                const rowClassName = isUser ? styles.messageRowUser : styles.messageRowOther;
                const bubbleClassName = isUser ? styles.userBubble : styles.otherBubble;
                
                // 1. JSON 타입 처리
                if (msg.senderType === 'JSON') {
                    return (
                        <div key={msg.chatId || index} className={`${styles.messageRow} ${styles.messageRowOther}`}>
                            <div className={`${styles.messageBubble} ${styles.otherBubble}`}>
                                <strong className={styles.messageText}>[건강 분석 카드]</strong>
                                {/* msg.message는 JSON 문자열일 수 있으므로 텍스트 영역에 출력 */}
                                <p className={styles.messageText}>{msg.message}</p>
                                <div className={styles.messageTime}>
                                    {formatTime(msg.sendDt)}
                                </div>
                            </div>
                        </div>
                    );
                }

                // 2. 일반 USER/AI 텍스트 메시지 렌더링
                return (
                    // 💡 .messageRow 및 정렬 클래스 적용
                    <div 
                        key={msg.chatId || index} 
                        className={`${styles.messageRow} ${rowClassName}`}
                    >
                        {/* 💡 .messageBubble 및 색상 클래스 적용 */}
                        <div className={`${styles.messageBubble} ${bubbleClassName}`}>
                            {/* 💡 .messageText 클래스 적용 */}
                            <div className={styles.messageText}>{msg.message}</div> 
                            
                            {/* 💡 .messageTime 클래스 적용 */}
                            <div className={styles.messageTime}>
                                {formatTime(msg.sendDt)} 
                            </div>
                        </div>
                    </div>
                );
            })}
            
            {/* 스크롤 위치 제어용 */}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatMessages;