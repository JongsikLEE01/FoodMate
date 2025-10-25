import React from 'react';
import styles from './css/ChatMessages.module.css';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatMessagesProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, messagesEndRef }) => {
  return (
    <div className={styles.messagesContainer}>
      <div className={styles.messagesWrapper}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.messageRow} ${msg.isUser ? styles.messageRowUser : styles.messageRowOther}`}
          >
            <div className={`${styles.messageBubble} ${msg.isUser ? styles.userBubble : styles.otherBubble}`}>
              <div className={styles.messageText}>{msg.text}</div>
              <div className={styles.messageTime}>{msg.timestamp}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;