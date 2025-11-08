package com.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

@Entity
@Table(name = "CHAT_LOG")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatLog {
    @Id
    @Column(name = "CHAT_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;            // 채팅 아이디
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NUM", nullable = false)
    private User user;              // user테이블과 매핑
    @Lob
    @Column(name = "MESSAGE")
    private String message;         // 메세지
    @Enumerated(EnumType.STRING)
    @Column(name = "SENDER_TYPE")
    private SenderType senderType;  // 전송타입 (user || ai)
    @Column(name = "SENT_DT")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime sentDt;   // 전송일

    @PrePersist
    protected void onCreate() {
        sentDt = LocalDateTime.now();
    }

    public enum SenderType {
        USER, AI, JSON
    }
}
