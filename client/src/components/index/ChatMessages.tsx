import React, { RefObject } from 'react';
import { formatTime, formatDateOnly } from '../../utils/dateFormat'; 
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
                const key = msg.chatId ? msg.chatId : `temp-${index}`;
                
                // 날짜 구분선 추가
                const currentDay = formatDateOnly(msg.sendDt);
                const previousDay = index > 0 ? formatDateOnly(messages[index - 1].sendDt) : null;
                const showDateSeparator = currentDay && (previousDay !== currentDay);
                
                const messageContent = (
                    <div key={key} className={`${styles.messageRow} ${msg.senderType === 'JSON' ? styles.messageRowOther : rowClassName}`}>
                        <div className={`${styles.messageBubble} ${msg.senderType === 'JSON' ? styles.otherBubble : bubbleClassName}`}>
                            {
                                msg.senderType === 'JSON' ? (
                                    <>
                                        <strong className={styles.messageText}>[건강 분석 카드]</strong>
                                        <p className={styles.messageText}>{msg.message}</p>
                                    </>
                                ) : (
                                    <div className={styles.messageText}>{msg.message}</div> 
                                )
                            }
                            <div className={styles.messageTime}>
                                {formatTime(msg.sendDt)} 
                            </div>
                        </div>
                    </div>
                );
                
                return (
                    <React.Fragment key={`fragment-${key}`}>
                        
                        {/* 2. 날짜 구분선 렌더링 */}
                        {showDateSeparator && (
                            <div 
                                key={`date-sep-${key}`} 
                                className={styles.dateSeparator}
                                data-content={currentDay}
                            >
                                <span className={styles.dateText}>{currentDay}</span>
                            </div>
                        )}
                        
                        {messageContent}
                    </React.Fragment>
                );
            })}
            
            <div ref={messagesEndRef} /> 
        </div>
    );
};

export default ChatMessages;