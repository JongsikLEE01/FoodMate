package com.project.dto.ChatLogDto;

import java.time.LocalDateTime;

import com.project.entity.ChatLog;
import com.project.entity.ChatLog.SenderType;

public record ChatLogResponse(
    Long userNum,
    Long chatId,
    String message,
    SenderType senderType,
    LocalDateTime sendDt
) {
    public static ChatLogResponse fromEntity(ChatLog entity){
        Long userNum = (entity.getUser() != null) ? entity.getUser().getUserNum() : null;

        return new ChatLogResponse(
            userNum,
            entity.getChatId(),
            entity.getMessage(),
            entity.getSenderType(),
            entity.getSentDt()
        );
    }
}
