package com.project.dto.ChatLogDto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.entity.ChatLog.SenderType;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ChatResponse(
    String chatId,
    SenderType senderType,
    String message,
    String sendDt,
    Object data    // JSON 타입 응답시 추가 데이터
) {}