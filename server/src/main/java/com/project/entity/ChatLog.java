package com.project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "CHAT_LOG")
@Getter
@Setter
public class ChatLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;

    @Lob
    private String message;

    @Enumerated(EnumType.STRING)
    private SenderType senderType; // USER or AI

    private LocalDateTime sentDt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NUM")
    private User user;

    public enum SenderType {
        USER, AI
    }
}
