package com.project.dto.ChatLogDto;

import com.project.entity.ChatLog.SenderType;

public record ChatLogRequest(
    Long userNum,
    String message,
    SenderType senderType
){ }
